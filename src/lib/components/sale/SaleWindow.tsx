"use client";
/**
 * @author Witse panneels
 */
import SaleButton from "./SaleButton";
import { useEffect, useRef, useState, useContext } from "react";
import type { productsResponse, pricesResponse } from "@/src/types/SMA_networking";
import type { Product, Prices } from "@/src/types/SMA_objects";
import { NextIntervalContext, CrashContext } from "./InervalContext";

export default function SaleWindow() {
  const nextInterval = useContext(NextIntervalContext);
  const nextIntervalRef = useRef(nextInterval);
  const crash = useContext(CrashContext);
  const crashRef = useRef(crash); // always in sync with context
  const is_krach = useRef(crash); // manually update

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  // protection against stale variables
  useEffect(() => {
    nextIntervalRef.current = nextInterval;
    crashRef.current = crash;
  }, [nextInterval, crash]);

  // get products and initial prices
  useEffect(() => {
    async function getProducts() {
      const req = await fetch("/api/getProducts");
      const body = (await req.json()) as productsResponse;
      setProducts(body.products);

      const request = await fetch("/api/getCurrentPrices");
      const resp = (await request.json()) as pricesResponse;
      const priceMap: Record<string, number> = {};
      for (const tri in resp.prices as Prices) {
        priceMap[tri] = resp.prices[tri];
      }
      setPrices(priceMap);

      setLoading(false);
    }

    getProducts();
  }, []);

  // loop every second to fetch state and new prices
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const timeLeft = nextIntervalRef.current - Date.now();

      if (timeLeft < 0 || is_krach.current != crashRef.current) {
        // ieuw copy paste! maar momenteel effe geen zin om het anders te doen
        const request = await fetch("/api/getCurrentPrices");
        const resp = (await request.json()) as pricesResponse;
        const priceMap: Record<string, number> = {};
        for (const tri in resp.prices as Prices) {
          priceMap[tri] = resp.prices[tri];
        }
        setPrices(priceMap);
      }

      if (is_krach.current != crashRef.current) {
        is_krach.current = crashRef.current;
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("stopped interval");
    };
  }, []);

  if (loading) {
    return (
      <div id="drinks">
        <h2>Loading</h2>
      </div>
    );
  }

  let compteur = 0; // counter for label color
  return (
    <>
      {/* <h1>{nextInterval + " " + intervalLength + " " + crash}</h1> */}
      <div id="drinks">
        {products.map((p) => {
          const color = "hsl(" + Math.ceil((compteur * 360) / (products.length + 1)) + ", 90%, 60%)";
          compteur++;
          return (
            <SaleButton
              key={p.tri}
              tri={p.tri}
              name={p.name}
              initial_price={p.defaultPrice}
              color={color}
              price={prices[p.tri]}
            />
          );
        })}
      </div>
    </>
  );
}
