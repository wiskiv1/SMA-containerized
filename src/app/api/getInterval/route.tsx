import { NextResponse } from "next/server";

// api/getInterval
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/interval/get`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
