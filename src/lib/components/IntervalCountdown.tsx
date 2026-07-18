"use client";
/**
 * @author Witse Panneels
 */
import { useEffect, useContext, useRef, useState } from "react";
import { NextIntervalContext } from "./sale/InervalContext";

export default function IntervalCountdown() {
  const nextInterval = useContext(NextIntervalContext);
  const nextIntervalRef = useRef(nextInterval);

  const [countdown, updateCountdown] = useState(10);

  // protection against stale variables
  useEffect(() => {
    nextIntervalRef.current = nextInterval;
  }, [nextInterval]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      let timeLeft = nextIntervalRef.current - Date.now();
      timeLeft = Math.floor(timeLeft / 1000);

      if (timeLeft >= 0) {
        updateCountdown(timeLeft);
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
      console.log("stopped interval");
    };
  }, []);

  return <span id="IntervalCountdown">{countdown}</span>;
}
