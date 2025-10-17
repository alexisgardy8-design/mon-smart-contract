// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { VRFConsumerBaseV2 } from "lib/forge-std/VRFConsumerBaseV2.sol";
import { VRFCoordinatorV2Interface } from "lib/forge-std/VRFCoordinatorV2Interface.sol";

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
contract CoinFlip is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface public COORDINATOR;

    // VRF params
    bytes32 public keyHash;
    uint64 public subscriptionId;
    uint32 public callbackGasLimit = 200000;
    uint16 public requestConfirmations = 3;

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

    constructor(address vrfCoordinator, bytes32 _keyHash, uint64 _subId) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        keyHash = _keyHash;
        subscriptionId = _subId;
    }

    /**
     * @notice Place a bet. Sends ETH with the call. choice must be 0 or 1.
     * Returns requestId which can be used to track the bet.
     */
    function placeBet(uint8 choice) external payable returns (uint256) {
        require(choice == 0 || choice == 1, "invalid choice");
        require(msg.value >= minBet, "stake too small");

        // Request randomness from Chainlink VRF v2
        uint256 requestId = COORDINATOR.requestRandomWords(
            keyHash,
            subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            1
        );

        bets[requestId] = Bet(payable(msg.sender), choice, msg.value, false);

        emit BetPlaced(requestId, msg.sender, choice, msg.value);
        return requestId;
    }

    /**
     * @notice Chainlink VRF callback. Uses the random value to decide the outcome.
     */
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
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
