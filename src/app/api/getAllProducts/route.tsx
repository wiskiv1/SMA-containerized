import { NextResponse } from "next/server";

// api/getAllProducts
export async function GET() {
  const req = await fetch(`${process.env.MARKET_URL}/product/getProducts`);
  const obj = await req.json();

  return NextResponse.json(obj);
}
