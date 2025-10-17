import { NextRequest, NextResponse } from "next/server";

type Body = {
  choice: "heads" | "tails";
  stake: number | string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body;

    const { choice, stake } = body;

    const stakeNum = typeof stake === "string" ? Number(stake) : stake;
    if (!choice || typeof stakeNum !== "number" || !isFinite(stakeNum) || stakeNum <= 0) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Simple pseudo-random flip. For production use a verifiable RNG.
    const coin = Math.random() < 0.5 ? "heads" : "tails";
    const win = coin === choice;
  const payout = win ? Number((stakeNum * 2).toFixed(3)) : 0;

  return NextResponse.json({ result: win ? "win" : "lose", coin, payout, stake: stakeNum });
  } catch (err) {
    console.error("coinflip error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
