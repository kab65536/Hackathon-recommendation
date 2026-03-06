import { NextResponse } from "next/server";
import { hackathons } from "@/data/hackathons";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const index = hackathons.findIndex(h => h.id === id);

  if (index !== -1) {
    hackathons.splice(index, 1);
  }

  return NextResponse.json({ message: "Deleted" });
}
