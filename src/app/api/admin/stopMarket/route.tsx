import { NextResponse } from "next/server";

// api/admin/stopMarket
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/market/stop`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
