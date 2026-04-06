import type { Metadata } from "next"
import SearchWidget from "@/components/SearchWidget"
import DestinationCard from "@/components/DestinationCard"
import { destinations } from "@/data/destinations"

export const metadata: Metadata = {
  title: "Goedkope vluchten — Vergelijk en bespaar",
  description:
    "Vind goedkope vluchten via vluchten.ai. Vergelijk alle luchtvaartmaatschappijen en boek de beste deal via Skyscanner, Kiwi.com of Booking.com.",
}

export default function GoedkopeVluchtenPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Goedkope vluchten vergelijken
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            Vul je reisgegevens in en vergelijk direct honderden maatschappijen.
          </p>
          <SearchWidget />
        </div>
      </div>

      {/* All destinations */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Alle bestemmingen</h2>
        <p className="text-slate-500 mb-8">Vertrekkend vanuit Nederland — prijzen zijn richtprijzen per persoon (retour)</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {destinations.map((dest) => (
            <DestinationCard key={dest.slug} destination={dest} />
          ))}
        </div>
      </section>
    </>
  )
}
