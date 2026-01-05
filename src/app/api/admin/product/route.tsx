import { NextResponse } from "next/server";
import { addProduct } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

type product = {
  tri: string;
  name: string;
  defaultPrice: number;
  crashPrice: number;
  minPrice: number;
};

export async function GET() {
  return NextResponse.json({
    method: "GET",
    message: "This is a GET response",
  });
}

/*  adding a product with a fetch request template:
fetch("/api/admin/product", {
method: "POST", body: JSON.stringify({
tri: "ZOE", name: "Hoegaarden blond", defaultPrice: 3, crashPrice: 0.75, minPrice: 0.80})})
*/
export async function POST(request: Request) {
  const body = await request.json();

  if (!isProduct(body)) {
    return NextResponse.json({ error: "request body is not a product" }, { status: 400 });
  }

  await addProduct(body.tri, body.name, body.defaultPrice, body.crashPrice, body.minPrice);

  return NextResponse.json({
    succes: true,
    meta: {
      time: new Date().toISOString(),
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isProduct(obj: any): obj is product {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.tri === "string" &&
    typeof obj.name === "string" &&
    typeof obj.defaultPrice === "number" &&
    typeof obj.crashPrice === "number" &&
    typeof obj.minPrice === "number"
  );
}
