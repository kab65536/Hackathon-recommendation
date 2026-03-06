import { NextResponse } from "next/server";
import { hackathons } from "@/data/hackathons";

export async function POST(req: Request) {
  const data = await req.json();

  hackathons.push(data);

  return NextResponse.json({
    message: "Hackathon added",
    data,
  });
}
