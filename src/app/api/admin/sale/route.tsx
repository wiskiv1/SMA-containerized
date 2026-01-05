import { NextResponse } from "next/server";
import { addSale } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

type sale = {
  tri: string;
};

export async function POST(request: Request) {
  const body = await request.json();

  if ("tri" in body && typeof body.tri === "string") {
    await addSale((body as sale).tri);
  } else {
    return NextResponse.json(
      { error: "no tri element in body" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    succes: true,
    meta: {
      time: new Date().toISOString(),
    },
  });
}
