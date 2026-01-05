import { NextResponse } from "next/server";
import {
  toggleCrash,
  isCrash,
} from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

type ApiResponse = {
  is_crash: boolean;
  meta: {
    timestamp: string;
  };
};

// api/admin/toggleCrash
export async function GET() {
  await toggleCrash();
  const c = await isCrash();

  const response: ApiResponse = {
    is_crash: c,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}
