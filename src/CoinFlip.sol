// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {VRFConsumerBaseV2Plus} from "backend/lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "backend/lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

/**
 * @title CoinFlip
 * @notice Simple on-chain coin flip using Chainlink VRF v2 for verifiable randomness.
 * Players call `placeBet` and send ETH. The contract requests randomness and when
 * the VRF coordinator calls `fulfillRandomWords` the contract determines win/lose
 * and pays out 2x the stake to the winner.
 *
 * Important: this example is intended for testnets (Sepolia / Base Sepolia). In
 * production you must harden the contract (withdraw flow, limits, withdraw pattern,
 * avoid reentrancy risks, and carefully manage subscription/funds).
 */
contract CoinFlip is VRFConsumerBaseV2Plus {

    // VRF params
    bytes32 public s_keyHash = 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
    uint256 public s_subscriptionId;
    uint32 public callbackGasLimit = 40000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords =  1;
    address public vrfCoordinator = 0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE; // Sepolia / Base Sepolia VRF Coordinator

    mapping(uint256 => address) private s_rollers;
    mapping(address => uint256) private s_results;

    constructor(uint256 subscriptionId) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
    }

    
    uint256 public minBet = 1e13; // 0.00001 ETH default min

    struct Bet {
        address payable player;
        uint8 choice; // 0 = heads, 1 = tails
        uint256 amount;
        bool settled;
    }

    // requestId => Bet
    mapping(uint256 => Bet) public bets;

    event BetPlaced(uint256 indexed requestId, address indexed player, uint8 choice, uint256 amount);
    event BetSettled(uint256 indexed requestId, address indexed player, uint8 result, bool win, uint256 payout);

    

    /**
     * @notice Place a bet. Sends ETH with the call. choice must be 0 or 1.
     * Returns requestId which can be used to track the bet.
     */
    function placeBet(uint8 choice) external payable returns (uint256) {
        require(choice == 0 || choice == 1, "invalid choice");
        require(msg.value >= minBet, "stake too small");

        // Request randomness from Chainlink VRF v2
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
        VRFV2PlusClient.RandomWordsRequest({
            keyHash: s_keyHash,
            subId: s_subscriptionId,
            requestConfirmations: requestConfirmations,
            callbackGasLimit: callbackGasLimit,
            numWords: numWords,
            extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: true}))
        })
        );


        bets[requestId] = Bet(payable(msg.sender), choice, msg.value, false);

        emit BetPlaced(requestId, msg.sender, choice, msg.value);
        return requestId;
    }

    /**
     * @notice Chainlink VRF callback. Uses the random value to decide the outcome.
     */
    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        Bet storage b = bets[requestId];
        if (b.player == address(0) || b.settled) {
            return; // nothing to do
        }

        uint8 result = uint8(randomWords[0] % 2); // 0 or 1
        bool win = (result == b.choice);
        uint256 payout = 0;

        if (win) {
            payout = b.amount * 2;
            // try to pay the player
            (bool sent, ) = b.player.call{value: payout}("{}");
            // if send fails, funds remain in contract for manual withdraw
            if (!sent) {
                payout = 0; // indicate payout not sent
            }
        }

        b.settled = true;
        emit BetSettled(requestId, b.player, result, win, payout);
    }

    // Allow contract owner (or anyone) to fund the contract to pay winners
    receive() external payable {}

    // Admin helpers
    function setMinBet(uint256 _min) external {
        minBet = _min;
    }

    function setCallbackGasLimit(uint32 _gas) external {
        callbackGasLimit = _gas;
    }
}
