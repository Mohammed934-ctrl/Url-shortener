"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";

type Url = {
  id: string;
  shortcode: string;
  originalUrl: string;
  visits: number;
};

export default function Urlist() {
  const [urls, seturls] = useState<Url[]>([]);
  const [copied, setcopied] = useState<boolean>(false);
  const [copyurl, setcopyurl] = useState<string>("");

  const fetchUrl = async () => {
    try {
      const response = await fetch("/api/urls");
      const data = await response.json();
      seturls(data);
    } catch (error) {
      console.log("ERROR in fetching error ", error);
    }
  };

  const shorturl = (code: string) => `${process.env.NEXT_PUBLIC_URL}/${code}`;

  const handlecopyurl = (code: string) => {
    const fullurl = `${shorturl(code)}`;
    navigator.clipboard.writeText(fullurl).then(() => {
      setcopied(true);
      setcopyurl(code);
      setTimeout(() => {
        setcopied(false);
        setcopyurl("");
      }, 3000);
    });
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-2xl font-sans">Recent URLs</h2>

      <ul className="space-y-4 ">
        {urls.map((url) => (
          <li key={url.id} className="flex justify-between gap-3 space-y-3 items-center bg-accent-foreground rounded-lg p-4">
            <Link
              href={`/${url.shortcode}`}
              target="_blank"
              className="text-blue-400"
            >
              {shorturl(url.shortcode)}
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className=" text-white hover:bg-gray-200 "
                onClick={() => handlecopyurl(url.shortcode)}
              >
                {copied && copyurl === url.shortcode ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
                <span className="sr-only">Copy URL</span>
              </Button>

              <span className="flex items-center gap-3 text-white ">
                <EyeIcon />
                {url.visits}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
