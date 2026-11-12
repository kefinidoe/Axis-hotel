import { NextResponse } from "next/server";
import { fetchReportData } from "@/lib/reporting-logic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  
  const data = await fetchReportData(start, end);
  return NextResponse.json(data);
}
