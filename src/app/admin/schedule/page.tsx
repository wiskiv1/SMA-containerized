"use client";
/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

/*
OPGELET!
om een "pagina" te laten zien moet de display op iets anders gezet worden dan "none"  
voor alle elementen is dit "flex" buiten voor stock_market, dan moet je "block" gebruiken
*/

export default function Schedule() {
  /* --- Global Variables --- */
  const scheduler_date = useRef<HTMLInputElement>(null);
  const scheduler_time = useRef<HTMLInputElement>(null);
  const [planning, setPlanning] = useState(false);

  const router = useRouter();

  async function handleScheduler() {
    setPlanning(true);
    // extract start time
    // "T" defaults to local time zone
    const time_string = scheduler_date.current!.value + "T" + scheduler_time.current!.value + ":00";
    let startTime;
    if (time_string.length == 19) {
      startTime = Date.parse(time_string);
    } else {
      alert("start date field must be filled");
      setPlanning(false);
      return;
    }

    // contact server
    const req = await fetch("/api/admin/planMarket", {
      method: "POST",
      body: JSON.stringify({ time: Number(startTime) }),
    });
    const response = await req.json();

    if (response.meta.success) {
      // planning of the party was a success => what now?
      router.push("/admin");
    } else {
      alert(response.meta.message);
    }

    setPlanning(false);
  }

  return (
    <div id="content">
      <h1>Setup the countdown</h1>
      <div className="ButtonContainer">
        <div
          className="BigButton"
          style={{
            backgroundImage: "linear-gradient(41deg, #5a5ca3  0%, #ed8ad2 100%)",
          }}
        >
          <h2>Start</h2>
          <input
            type="date"
            className="datepicker-input"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
            ref={scheduler_date}
          />
          <p></p>
          <input type="time" className="datepicker-input" required ref={scheduler_time} />
          <p></p>
        </div>
        <div
          className="BigButton"
          style={{
            backgroundImage: "linear-gradient(336deg, #7560a7 0%, #df6cbe 100%); height:fit-content",
          }}
        >
          <h2>Scheduling a party</h2>
          <p>
            Choose the date and time for your party! Once planned the home page wil redirect to the countdown screen.
          </p>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <div
          id="validate_schedule"
          className="SmallButton"
          style={{
            backgroundImage: "linear-gradient(193deg, #775ca9 0%, #ed8ad2 100%)",
          }}
          onClick={() => {
            handleScheduler();
          }}
        >
          {planning ? "Validating..." : "Validate"}
        </div>
      </div>
    </div>
  );
}
