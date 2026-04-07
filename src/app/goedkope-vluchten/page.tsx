import type { Metadata } from "next"
import SearchWidget from "@/components/SearchWidget"
import DestinationCard from "@/components/DestinationCard"
import { destinations } from "@/data/destinations"

export const metadata: Metadata = {
  title: "Goedkope vluchten — Vergelijk aanbieders en vind de laagste prijs",
  description:
    "Wij vergelijken Skyscanner, Kiwi.com en Booking.com zodat jij weet waar je het goedkoopst boekt. Nederlandstalige reisgids. Gratis.",
}

export default function GoedkopeVluchtenPage() {
  return (
    <>
      <section className="bg-[#05428C] pt-8 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-2">
            Vluchten vergelijken
          </h1>
          <p className="text-sm text-white/65 mb-6 max-w-lg mx-auto">
            Wij vergelijken Skyscanner, Kiwi.com en Booking.com — jij ziet direct welke aanbieder nu het goedkoopst is.
          </p>
          <SearchWidget />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Overzicht</p>
          <h2 className="text-2xl font-bold text-slate-900">Alle bestemmingen</h2>
          <p className="text-sm text-slate-500 mt-1">Richtprijzen per persoon (retour vanuit Nederland) — actuele prijs zie je bij de aanbieder</p>
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
