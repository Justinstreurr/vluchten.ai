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
      <section className="bg-[#05428C] pt-8 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-2">
            Goedkope vluchten vergelijken
          </h1>
          <p className="text-sm text-white/60 mb-6">
            Vul je reisgegevens in en vergelijk direct honderden maatschappijen.
          </p>
          <SearchWidget />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Overzicht</p>
          <h2 className="text-2xl font-bold text-slate-900">Alle bestemmingen</h2>
          <p className="text-sm text-slate-500 mt-1">Vertrekkend vanuit Nederland — prijzen zijn richtprijzen per persoon (retour)</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {destinations.map((dest) => (
            <DestinationCard key={dest.slug} destination={dest} />
          ))}
        </div>
      </section>
    </>
  )
}
