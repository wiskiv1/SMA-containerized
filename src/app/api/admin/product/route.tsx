import { NextResponse } from "next/server";

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

  const req = await fetch(`${process.env.MARKET_URL}/product/add`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const obj = await req.json();

  return NextResponse.json(obj);
}
