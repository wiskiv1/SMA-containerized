import { NextResponse } from "next/server";
import { getCalculatorInfo, getCalculatorParams, setCalculatorParams } from "@/src/lib/SMAclient";

// api/admin/calculator
// get name and version
export async function GET() {
  const obj = await getCalculatorInfo();

  return NextResponse.json(obj);
}

// get parameters
export async function OPTIONS() {
  const obj = await getCalculatorParams();

  return NextResponse.json(obj);
}

// set parameters
export async function POST(request: Request) {
  const body = await request.json();
  const obj = await setCalculatorParams(body);

  return NextResponse.json(obj);
}
