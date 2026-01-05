import { NextResponse } from "next/server";
import { getIntervalTime } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

type ApiResponse = {
  interval: number;
  time: number;
  meta: {
    timestamp: string;
  };
};

// api/getInterval
export async function GET() {
  const i = await getIntervalTime();

  const response: ApiResponse = {
    interval: i.int,
    time: i.when,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}
