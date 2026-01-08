import { NextResponse } from "next/server";

// api/admin/pauseMarket
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/market/start`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
