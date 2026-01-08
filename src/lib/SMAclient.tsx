/**
 * @author Witse Panneels
 */

import { MarketState } from "../types/SMA_objects";

/** */
const BASE_URL = process.env.MARKET_URL ?? "http://localhost:4000";

export async function getPartyStatus(): Promise<MarketState> {
  const res = await fetch(`${BASE_URL}/market/status`);
  const body = await res.json();

  return body.status as MarketState;
}
