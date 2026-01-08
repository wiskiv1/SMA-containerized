import { NextResponse } from "next/server";

// api/isCrash
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/interval/isCrash`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
