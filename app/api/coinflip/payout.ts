/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";

type Body = {
  to: string;
  amount: number; // in ETH
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body;
    const { to, amount } = body;

    if (!to || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const privateKey = process.env.HOUSE_PRIVATE_KEY;
    const rpcUrl = process.env.RPC_URL;

    if (!privateKey || !rpcUrl) {
      return NextResponse.json({ message: "Payout not configured on server" }, { status: 500 });
    }

    // Create an account from the private key and a wallet client using http transport
    try {
      const account = privateKeyToAccount(privateKey as `0x${string}`);
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: http(rpcUrl as any),
        account,
      });

      // parse amount allowing up to 3 decimals
      const amountStr = typeof amount === "number" ? amount.toFixed(3) : amount;
      const value = parseUnits(amountStr, 18);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const txHash = await (walletClient as any).sendTransaction({
        to: to as `0x${string}`,
        value,
      });

      return NextResponse.json({ txHash });
    } catch (err) {
      console.error("payout error", err);
      return NextResponse.json({ message: "Failed to send tx" }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
