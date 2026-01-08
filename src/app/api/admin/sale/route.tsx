import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if ("tri" in body && typeof body.tri === "string" && "price" in body && typeof body.price === "number") {
    const req = await fetch(`${process.env.MARKET_URL}/product/sell?tri=${body.tri}&price=${body.price}`);
    const obj = await req.json();
    return NextResponse.json(obj);
  } else {
    return NextResponse.json({ success: false, message: "no tri of price element in body" }, { status: 400 });
  }
}
