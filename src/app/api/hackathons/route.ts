import { NextResponse } from "next/server";
import { mockHackathons } from "@/data/mockHackathons";

export async function GET() {
  return NextResponse.json(mockHackathons);
}
