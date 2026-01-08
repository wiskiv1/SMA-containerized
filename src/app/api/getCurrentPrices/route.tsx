import { NextResponse } from "next/server";

// ROUTE: api/
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/product/getCurrentPrices`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
