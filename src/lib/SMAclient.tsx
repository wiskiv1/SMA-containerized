/**
 * @author Witse Panneels
 */

import { MarketState } from "../types/SMA_objects";

/** */
const BASE_URL = process.env.MARKET_URL ?? "http://localhost:4000";

/* ---- MARKET ---- */

export async function getPartyStatus(): Promise<MarketState> {
  const res = await fetch(`${BASE_URL}/market/status`);
  const body = await res.json();

  return body.status as MarketState;
}

/* ---- CALCULATOR ---- */

export async function getCalculatorInfo() {
  const res = await fetch(`${BASE_URL}/calculator/getName`);
  const body = await res.json();

  return body;
}

export async function getCalculatorParams() {
  const res = await fetch(`${BASE_URL}/calculator/getParameters`);
  const body = await res.json();

  return body;
}

export async function setCalculatorParams(params: object) {
  const res = await fetch(`${BASE_URL}/calculator/setParameters`, {
    method: "POST",
    body: JSON.stringify(params),
  });
  const body = await res.json();

  return body;
}

/* ---- GENERAL ---- */

export async function getWorkerStatus() {
  const res = await fetch(`${BASE_URL}/server/status`);
  const body = await res.json();

  return body;
}
