import { NextResponse } from "next/server";
import { getCurrentPrices } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

type ApiResponse = {
  prices: price[];
  meta: {
    time: string;
  };
};

type price = {
  tri: string;
  price: number;
};

// ROUTE: api/
export async function GET() {
  const prices = await getCurrentPrices();

  const response: ApiResponse = {
    prices: [],
    meta: {
      time: new Date().toISOString(),
    },
  };

  for (const [tri, prix] of prices) {
    response.prices.push({
      tri: tri,
      price: prix,
    });
  }

  return NextResponse.json(response);
}
