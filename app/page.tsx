"use client";
import { useEffect, useState } from "react";
import { publicClient, counterContract, COUNTER_CONTRACT_ADDRESS } from "./lib/counterClient";
import { useAccount, useWriteContract } from "wagmi";
import Image from "next/image";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
// import { useQuickAuth } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";

export default function Home() {
  // Counter (blockchain) state & actions
  const [counter, setCounter] = useState<number | null>(null);
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  // Read the current counter value
  useEffect(() => {
    async function fetchCounter() {
      try {
        const value = await publicClient.readContract({
          address: COUNTER_CONTRACT_ADDRESS,
          abi: counterContract.abi,
          functionName: "number",
        });
        setCounter(Number(value));
      } catch {
        setCounter(null);
      }
    }
    fetchCounter();
  }, []);

  // Increment the counter
  const handleIncrement = async () => {
    if (!isConnected) return;
    try {
      await writeContract({
        address: COUNTER_CONTRACT_ADDRESS,
        abi: counterContract.abi,
        functionName: "increment",
      });
      // Re-fetch counter after increment
      const value = await publicClient.readContract({
        address: COUNTER_CONTRACT_ADDRESS,
        abi: counterContract.abi,
        functionName: "number",
      });
      setCounter(Number(value));
    } catch {
      // handle error
    }
  };

  // MiniKit setup
  const { setMiniAppReady, isMiniAppReady } = useMiniKit();

  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    }
  }, [setMiniAppReady, isMiniAppReady]);

  // --- Coinflip game state ---
  const [stake, setStake] = useState<number>(1);
  const [choice, setChoice] = useState<"heads" | "tails">("heads");
  const [flipResult, setFlipResult] = useState<null | {
    result: "win" | "lose";
    coin: "heads" | "tails";
    payout: number;
    stake: number;
  }>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [payoutStatus, setPayoutStatus] = useState<null | { status: string; txHash?: string }>(null);

  const handleFlip = async () => {
    // simple client-side validation
    if (!stake || stake <= 0) {
      setFlipResult({ result: "lose", coin: choice, payout: 0, stake });
      return;
    }

    setIsFlipping(true);
    setFlipResult(null);

    try {
      const res = await fetch("/api/coinflip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice, stake }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setFlipResult({ result: "lose", coin: choice, payout: 0, stake });
        console.error("Coinflip API error:", err);
      } else {
        const data = await res.json();
        setFlipResult(data);
        // If we won and the user is connected, request a payout from the house
        if (data.result === "win" && isConnected && address) {
          try {
            setPayoutStatus({ status: "pending" });
            const payRes = await fetch("/api/coinflip/payout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ to: address, amount: data.payout }),
            });

            if (!payRes.ok) {
              const err = await payRes.json().catch(() => ({}));
              setPayoutStatus({ status: "failed" });
              console.error("Payout failed:", err);
            } else {
              const payData = await payRes.json();
              setPayoutStatus({ status: "sent", txHash: payData.txHash });
            }
          } catch (e) {
            console.error(e);
            setPayoutStatus({ status: "error" });
          }
        }
      }
    } catch {
      setFlipResult({ result: "lose", coin: choice, payout: 0, stake });
    } finally {
      setIsFlipping(false);
    }
  };
  // Render JSX (page UI)
  return (
    <div className={styles.container}>
      <header className={styles.headerWrapper}>
        <Wallet />
      </header>

      <div className={styles.content}>
        <Image
          priority
          src="/sphere.svg"
          alt="Sphere"
          width={200}
          height={200}
        />
        <h1 className={styles.title}>MiniKit</h1>

        <p>
          Get started by editing <code>app/page.tsx</code>
        </p>

  <h2 className={styles.componentsTitle}>MiniKit Coinflip</h2>
        <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
          <h3>Counter Contract Demo</h3>
          <p>Current value: {counter !== null ? counter : 'Loading...'}</p>
          <button onClick={handleIncrement} disabled={!isConnected || isPending}>
            {isPending ? 'Incrementing...' : 'Increment'}
          </button>
          {!isConnected && <p style={{ color: 'red' }}>Connect your wallet to interact.</p>}
        </div>

        <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
          <h3>Coinflip</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <label>
              Mise:
              <input
                type="number"
                min={0}
                step={0.01}
                value={stake}
                onChange={(e) => setStake(Number(e.target.value))}
                style={{ marginLeft: 8, width: 100 }}
              />
            </label>

            <label style={{ marginLeft: 12 }}>
              Choix:
              <select value={choice} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setChoice(e.target.value as "heads" | "tails")} style={{ marginLeft: 8 }}>
                <option value="heads">Heads</option>
                <option value="tails">Tails</option>
              </select>
            </label>

            <button onClick={handleFlip} disabled={isFlipping} style={{ marginLeft: 12 }}>
              {isFlipping ? 'Flipping...' : 'Flip'}
            </button>
          </div>

          {flipResult && (
            <div style={{ marginTop: 12 }}>
              <strong>Résultat:</strong> {flipResult.result === 'win' ? 'Gagné 🎉' : 'Perdu 😞'}<br />
              <strong>Pièce:</strong> {flipResult.coin}<br />
              <strong>Mise:</strong> {flipResult.stake}<br />
              <strong>Payout:</strong> {flipResult.payout}
            </div>
          )}
          {payoutStatus && (
            <div style={{ marginTop: 8 }}>
              <strong>Payout:</strong> {payoutStatus.status} {payoutStatus.txHash ? `(tx: ${payoutStatus.txHash})` : ''}
            </div>
          )}
        </div>

        <div style={{ marginTop: 24 }}>
          <p style={{ fontWeight: 600 }}>Cryptomonnaie utilisée: Sepolia ETH</p>
        </div>
      </div>
    </div>
  );
}
