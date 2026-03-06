import { NextResponse } from "next/server";
import { hackathons } from "@/data/hackathons";

export async function PUT(req: Request) {
  const data = await req.json();

  const index = hackathons.findIndex(h => h.id === data.id);

  if (index !== -1) {
    hackathons[index] = data;
  }

  return NextResponse.json({
    message: "Updated",
    data,
  });
}
