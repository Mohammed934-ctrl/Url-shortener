"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";


interface ShortenformProps {
  handleshortenurl?: () => void;
}

export default function Shortenform({handleshortenurl}:ShortenformProps) {
  const [url, setUrl] = useState<string>("");
  const [loading, setloading] = useState <boolean>(false)


  const handlesumbit = async (e: React.FormEvent) => {

    e.preventDefault();
    setloading(true)
    try {
      const reposne = await fetch("/api/shorten",{
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      })
      
      await reposne.json();
     setUrl("")
     handleshortenurl?.(); 
    } catch (error) {
      console.error("Error submitting URL:", error);
      
    } finally{
      setloading(false)
    }
  }
  return (
    <form onSubmit={handlesumbit}>
      <div className="space-y-3">
        <Input
          required
          className="h-12"
          value={url}
          placeholder="Enter your url  to shorten "
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" className="w-full ">
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </div>
    </form>
  );
}
