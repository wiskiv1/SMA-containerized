import { NextResponse } from "next/server";
import { isCrash } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

type ApiResponse = {
  is_crash: boolean;
  meta: {
    timestamp: string;
  };
};

// api/isCrash
export async function GET() {
  const c = await isCrash();

  const response: ApiResponse = {
    is_crash: c,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}
