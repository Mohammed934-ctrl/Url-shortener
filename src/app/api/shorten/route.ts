import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json(); // make sure key matches frontend
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    let shortcode: string;

    // Try until no collision
    while (true) {
      try {
        shortcode = nanoid(8); // increased length to reduce collision
        const shorturl = await prisma.url.create({
          data: { originalUrl: url, shortcode },
        });
        return NextResponse.json({ shortcode: shorturl.shortcode });
      } catch (err: any) {
        if (err.code === "P2002") continue; // collision, retry
        console.error("Prisma Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
    }
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
