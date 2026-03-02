import { NextResponse } from "next/server";
import { mockHackathons } from "@/data/mockHackathons";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }

  const hackathon = mockHackathons.find(
    (h) => h.id === id
  );

  if (!hackathon) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(hackathon);
}
