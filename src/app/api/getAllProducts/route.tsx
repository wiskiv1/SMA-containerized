import { NextResponse } from "next/server";
import { getAllProducts } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

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
  crashPrice: number;
  minPrice: number;
};

// api/getAllProducts
export async function GET() {
  const products = await getAllProducts();

  const response: ApiResponse = {
    products: [],
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
  for (const [tri, product] of products) {
    response.products.push({
      tri: tri,
      name: product.name,
      defaultPrice: product.defaultPrice,
      crashPrice: product.crashPrice,
      minPrice: product.minPrice,
    });
  }

  return NextResponse.json(response);
}
