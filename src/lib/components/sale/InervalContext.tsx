"use client";
import { createContext, ReactNode, useRef, useEffect, useState } from "react";
import type { intervalInfo, crashInfo } from "@/src/types/SMA_networking";

export const NextIntervalContext = createContext(0);

export const IntervalLengthContext = createContext(60000);

export const CrashContext = createContext(false);

export function IntervalContext({ children }: { children: ReactNode }) {
  const [is_krach, updateKrach] = useState(false);
  const [interval, updateInterval] = useState(60000);
  const [nextInterval, updateNextInterval] = useState(0);

  // references to protect from stale variables inside
  const is_krachRef = useRef(false);
  const intervalRef = useRef(60000);
  const nextIntervalRef = useRef(0);

  useEffect(() => {
    is_krachRef.current = is_krach;
    intervalRef.current = interval;
    nextIntervalRef.current = nextInterval;
  }, [is_krach, interval, nextInterval]);

  // loop every second to fetch new information
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const timeLeft = nextIntervalRef.current - Date.now();

      // check for crash
      fetch("/api/isCrash").then(async (resp) => {
        const data = (await resp.json()) as crashInfo;
        if (is_krachRef.current != data.is_crash) {
          updateKrach(data.is_crash);
          // TODO add krach class to body element (dynamic css for crashes)
        }
      });

      // check for new interval info
      if (timeLeft < 0) {
        fetch("/api/getInterval").then(async (resp) => {
          const data = (await resp.json()) as intervalInfo;
          if (intervalRef.current != data.intervalLength) updateInterval(data.intervalLength);
          if (nextIntervalRef.current != data.nextInterval) updateNextInterval(data.nextInterval);
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("stopped interval");
    };
  }, []);
  return (
    <NextIntervalContext value={nextInterval}>
      <IntervalLengthContext value={interval}>
        <CrashContext value={is_krach}>{children}</CrashContext>
      </IntervalLengthContext>
    </NextIntervalContext>
  );
}
