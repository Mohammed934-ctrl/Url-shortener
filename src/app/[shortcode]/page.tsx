import prisma from "@/lib/db";
import { redirect, notFound } from "next/navigation";

interface RedirectPageProps {
  params: Promise<{ shortcode: string }>; // params is a Promise
}

export default async function Page({ params }: RedirectPageProps) {
  // Await the params promise
  const { shortcode } = await params;

  if (!shortcode) return notFound();

  const url = await prisma.url.findUnique({
    where: { shortcode },
  });

  if (!url) return notFound();

  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  redirect(url.originalUrl);
}
