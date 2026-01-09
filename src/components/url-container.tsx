"use client"
import Shortenform from "./shorten-form"
import Urlist from "./url-list"
import { useState } from "react"

export default function UrlContainer() {
  const [refreshkey, setrefreshkey] = useState(0)


  const handleshortenurl =()=>{
    setrefreshkey((prev) => prev + 1);
  }
  return (
    <div className="space-y-3">
      <Shortenform handleshortenurl={handleshortenurl}/>
      <Urlist key={refreshkey} />
    </div>
  )
}
