import { NextResponse } from "next/server";
import { getProducts } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

type ApiResponse = {
  products: ProductJson[];
  meta: {
    timestamp: string;
  };
};

type ProductJson = {
  tri: string;
  name: string;
  defaultPrice: number;
};

// api/getProducts
export async function GET() {
  const products = (await getProducts()) as ProductJson[];

  const response: ApiResponse = {
    products: products,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}
