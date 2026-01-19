"use client";
/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BigButton from "@/src/lib/components/BigButton";
import "./page.css";
// import "./old-page.css";

/*
OPGELET!
om een "pagina" te laten zien moet de display op iets anders gezet worden dan "none"  
voor alle elementen is dit "flex" buiten voor stock_market, dan moet je "block" gebruiken
*/

export default function Start() {
  /* --- Global Variables --- */
  const [starting, setStarting] = useState(false);
  const router = useRouter();

  /* --- handlers --- */

  async function handleStart() {
    setStarting(true);
    await fetch("/api/admin/startMarket");
    router.push("/admin/sale");
  }

  return (
    <div id="content">
      <h1>Hello you !</h1>
      <div className="ButtonContainer">
        <Link href="/admin/schedule">
          <BigButton
            name="schedule_start"
            clBack={() => {}}
            bgImage="linear-gradient(237deg,rgb(0 40 70) -4.8%,rgb(255 115 115 / 52%) 72.7%,rgba(255, 175, 123, 1) 100% )"
          >
            <h2>Schedule the party</h2>
            <p>You want to have a beautiful countdown? This is the way!</p>
          </BigButton>
        </Link>
        <BigButton
          name="start_now"
          clBack={() => {
            handleStart();
          }}
          bgImage="linear-gradient(111deg,rgb(0 40 70) -4.8%,rgb(255 115 115 / 52%) 72.7%,rgba(255, 175, 123, 1) 100% )"
        >
          <h2>{starting ? "Starting..." : "Start now !"}</h2>
          <p>You seem to be in a hurry. Go go go, Let the party begin!</p>
        </BigButton>
        <Link href="/admin/settings">
          <BigButton
            name="settings"
            clBack={() => {}}
            bgImage="linear-gradient(30deg,rgb(0 40 70) -4.8%,rgb(255 115 115 / 52%) 72.7%,rgba(255, 175, 123, 1) 100% )"
          >
            <h2>Settings</h2>
            <p>Before you start! Click here to add/change/delete products</p>
          </BigButton>
        </Link>
      </div>
    </div>
  );
}
