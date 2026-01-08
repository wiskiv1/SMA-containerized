import { NextResponse } from "next/server";

// api/admin/toggleCrash
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/interval/toggleCrash`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
