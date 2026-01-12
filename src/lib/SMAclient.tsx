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

export async function planMarket(when: number) {
  const res = await fetch(`${process.env.MARKET_URL}/market/plan?time=${String(when)}`);
  const body = await res.json();

  return body;
}

export async function resetMarket() {
  const res = await fetch(`${process.env.MARKET_URL}/market/reset`);
  const body = await res.json();

  return body;
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

/* --- INTERVAL --- */
export async function getInterval() {
  const res = await fetch(`${process.env.MARKET_URL}/interval/get`);
  const body = await res.json();

  return body;
}

export async function setIntervalLength(newInter: number) {
  const res = await fetch(`${process.env.MARKET_URL}/interval/set?length=${String(newInter)}`);
  const body = await res.json();

  return body;
}

/* ---- GENERAL ---- */

export async function getWorkerStatus() {
  const res = await fetch(`${BASE_URL}/server/status`);
  const body = await res.json();

  return body;
}
