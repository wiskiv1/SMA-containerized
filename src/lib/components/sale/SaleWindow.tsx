"use client";
/**
 * @author Witse panneels
 */
import SaleButton from "./SaleButton";
import { useEffect, useRef, useState, useContext } from "react";
import type { productsResponse } from "@/src/types/SMA_networking";
import type { Product } from "@/src/types/SMA_objects";
import { NextIntervalContext, CrashContext, IntervalLengthContext } from "./InervalContext";

export default function SaleWindow() {
  const intervalLength = useContext(IntervalLengthContext);
  const nextInterval = useContext(NextIntervalContext);
  const crash = useContext(CrashContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  // get products and initial prices
  useEffect(() => {
    async function getProducts() {
      const req = await fetch("/api/getProducts");
      const body = (await req.json()) as productsResponse;
      setProducts(body.products);

      const priceMap: Record<string, number> = {};
      body.products.forEach((p) => {
        priceMap[p.tri] = p.defaultPrice;
      });
      setPrices(priceMap);

      setLoading(false);
    }

    getProducts();
  }, []);

  // loop every second to fetch state and new prices
  useEffect(() => {
    const intervalId = setInterval(() => {
      // todo create context for crash and interval time
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
      <h1>{nextInterval + " " + intervalLength + " " + crash}</h1>
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
