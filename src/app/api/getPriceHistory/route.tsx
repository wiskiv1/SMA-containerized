import { NextResponse } from "next/server";

// ROUTE: api/getPriceHistory
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/product/getPriceHistory`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
