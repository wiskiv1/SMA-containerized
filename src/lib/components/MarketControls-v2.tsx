"use client";
/**
 * @author Witse Panneels
 */
import { useEffect, useState } from "react";
import type { marketInfo } from "@/src/types/SMA_networking";
import BigButton from "./BigButton";

export default function MarketControls() {
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

    if (!body.meta.success) {
      alert(body.meta.message);
    }
  }

  async function handlePause() {
    const req = await fetch("/api/admin/pauseMarket");
    const body = (await req.json()) as marketInfo;
    setStatus(body.status);

    if (!body.meta.success) {
      alert(body.meta.message);
    }
  }

  async function handleStop() {
    const req = await fetch("/api/admin/stopMarket");
    const body = (await req.json()) as marketInfo;
    setStatus(body.status);

    if (!body.meta.success) {
      alert(body.meta.message);
    }
  }

  async function handleReset() {
    const req = await fetch("/api/admin/resetMarket");
    const body = (await req.json()) as marketInfo;
    setStatus(body.status);

    if (!body.meta.success) {
      alert(body.meta.message);
    }
  }

  return (
    <>
      <h2>
        status <span>{status}</span>
      </h2>
      <div className="ButtonContainer">
        <BigButton
          name={"Pause"}
          bgImage={"linear-gradient( 111.1deg, rgba(0,40,70,1) -4.8%, rgb(115 228 255) 82.7%, rgb(123 255 183) 97.2% )"}
          clBack={handlePause}
        >
          <h2>Pause the party</h2>
          <p>Stop the party, but only just for a little bit.</p>
        </BigButton>
        <BigButton
          name={"Play"}
          bgImage={"linear-gradient( 223.1deg, rgba(0,40,70,1) -4.8%, rgb(115 228 255) 82.7%, rgb(123 255 183) 97.2% )"}
          clBack={handleStart}
        >
          <h2>Resume the party</h2>
          <p>So much fun right now, I want it to never stop.</p>
        </BigButton>
        <BigButton
          name={"Stop"}
          bgImage={"linear-gradient( 280deg, rgba(0,40,70,1) -4.8%, rgb(115 228 255) 82.7%, rgb(123 255 183) 97.2% )"}
          clBack={handleStop}
        >
          <h2>Stop</h2>
          <p>The people are boring, they want to go home</p>
        </BigButton>
        <BigButton
          name={"Stop"}
          bgImage={"linear-gradient( 53deg, rgba(0,40,70,1) -4.8%, rgb(115 228 255) 82.7%, rgb(123 255 183) 97.2% )"}
          clBack={handleReset}
        >
          <h2>Reset</h2>
          <p>Sometimes, you need to go back to a clean board to achieve beter. Good luck !</p>
        </BigButton>
      </div>
    </>
  );
}
