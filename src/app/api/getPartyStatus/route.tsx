import { NextResponse } from "next/server";

// api/getPartyStatus
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/market/status`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
