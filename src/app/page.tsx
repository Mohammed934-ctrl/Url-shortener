import UrlContainer from "@/components/url-container";


export default function Home() {
  return (
    <main className="max-w-xl mx-auto space-y-6 py-13 md:py-24 ">
      <div className="space-y-3 text-center">
        <h1 className="font-black text-2xl font-sans">URL Shortener</h1>
        <p className="font-normal text-gray-700">Shorten your long URLs and share them easily</p>

      </div>
       <UrlContainer/>
    </main>
  );
}
