import { createConfig, http } from 'wagmi';
import { sepolia } from 'viem/chains';
import { createPublicClient } from 'viem';
import CounterABI from './CounterABI.json';

export const COUNTER_CONTRACT_ADDRESS = '0x0373a98Dee75cF9A8Ddc07707dcFbFCd49Ec5B14';

export const publicClient = createPublicClient({
  chain: sepolia, // Change to your chain if needed
  transport: http(),
});

export const counterContract = {
  address: COUNTER_CONTRACT_ADDRESS,
  abi: CounterABI,
};
