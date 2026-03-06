import { NextResponse } from "next/server";
import { hackathons } from "@/data/hackathons";

export async function GET() {
  return NextResponse.json(hackathons);
}
