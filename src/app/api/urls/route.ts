import { NextResponse } from "next/server";
import prisma from "@/lib/db"
export  async function GET() {
  try {
    const urls = await prisma?.url.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    return NextResponse.json(urls)
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
