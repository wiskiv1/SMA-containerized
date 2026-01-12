import { NextResponse } from "next/server";
import { resetMarket } from "@/src/lib/SMAclient";

// api/admin/resetMarket
export async function GET() {
  const obj = await resetMarket();

  return NextResponse.json(obj);
}
