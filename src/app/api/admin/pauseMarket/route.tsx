import { NextResponse } from "next/server";
import { pauseMarket } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

type ApiResponse = {
  succes: boolean;
  meta: {
    timestamp: string;
  };
};

// api/admin/startMarket
export async function GET() {
  await pauseMarket();

  const response: ApiResponse = {
    succes: true,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}
