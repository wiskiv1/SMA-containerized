"use client";
/**
 * @author Witse Panneels
 */
import { useEffect, useState } from "react";
import type { marketInfo } from "@/src/types/SMA_networking";
import "./MarketControls.css";

export default function MarketControls({
  buttonColor,
  buttonBackground,
}: {
  buttonColor?: string;
  buttonBackground?: string;
}) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function getStatus() {
      const req = await fetch("/api/getPartyStatus");
      const body = (await req.json()) as marketInfo;
      setStatus(body.status);
    }
    getStatus();
  }, []);

  async function handleStart() {
    const req = await fetch("/api/admin/startMarket");
    const body = (await req.json()) as marketInfo;
    setStatus(body.status);
  }

  async function handlePause() {
    const req = await fetch("/api/admin/pauseMarket");
    const body = (await req.json()) as marketInfo;
    setStatus(body.status);
  }

  async function handleStop() {
    const req = await fetch("/api/admin/stopMarket");
    const body = (await req.json()) as marketInfo;
    setStatus(body.status);
  }

  return (
    <div id="MarketController">
      <p>
        state: <span>{status}</span>
      </p>
      <div id="buttonContainer">
        <div
          className="button"
          onClick={handlePause}
          style={{ "--button-background": buttonBackground } as React.CSSProperties}
        >
          <div className="pause" style={{ "--button-color": buttonColor } as React.CSSProperties}></div>
        </div>
        <div
          className="button"
          onClick={handleStart}
          style={{ "--button-background": buttonBackground } as React.CSSProperties}
        >
          <div className="play" style={{ "--button-color": buttonColor } as React.CSSProperties}></div>
        </div>
        <div
          className="button"
          onClick={handleStop}
          style={{ "--button-background": buttonBackground } as React.CSSProperties}
        >
          <div className="stop" style={{ "--button-color": buttonColor } as React.CSSProperties}></div>
        </div>
      </div>
    </div>
  );
}
