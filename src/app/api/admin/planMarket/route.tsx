import { NextResponse } from "next/server";
import { planMarket } from "@/src/lib/SMAclient";

// api/admin/pauseMarket
export async function POST(request: Request) {
  const when = (await request.json()).time;
  let obj;
  if (typeof when !== "number") {
    obj = await planMarket(1);
    obj.meta.message! = "Error: 'time' not of type 'number'";
  } else {
    obj = await planMarket(when);
  }

  return NextResponse.json(obj);
}
