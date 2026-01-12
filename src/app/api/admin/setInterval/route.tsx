import { setIntervalLength, getInterval } from "@/src/lib/SMAclient";
import { NextResponse } from "next/server";

// api/admin/setInterval
export async function POST(request: Request) {
  const newInter = (await request.json()).interval;
  let obj;
  if (typeof newInter !== "number") {
    obj = await getInterval();
    obj.meta.success! = false;
    obj.meta.message! = "Error: 'interval' not of type 'number'";
  } else {
    obj = await setIntervalLength(newInter);
  }
  return NextResponse.json(obj);
}
