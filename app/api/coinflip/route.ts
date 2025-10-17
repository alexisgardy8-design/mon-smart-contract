import { NextRequest, NextResponse } from "next/server";

type Body = {
  choice: "heads" | "tails";
  stake: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body;

    const { choice, stake } = body;

    if (!choice || typeof stake !== "number" || stake <= 0) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Simple pseudo-random flip. For production use a verifiable RNG.
    const coin = Math.random() < 0.5 ? "heads" : "tails";
    const win = coin === choice;
    const payout = win ? Number((stake * 2).toFixed(2)) : 0;

    return NextResponse.json({ result: win ? "win" : "lose", coin, payout, stake });
  } catch (err) {
    console.error("coinflip error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
