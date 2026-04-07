import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import DestinationCard from "@/components/DestinationCard"
import { destinations } from "@/data/destinations"
import { regions, getRegion } from "@/data/regions"

type Props = { params: Promise<{ regio: string }> }

export async function generateStaticParams() {
  return regions.map((r) => ({ regio: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { regio } = await params
  const region = getRegion(regio)
  if (!region) return {}
  return {
    title: `Goedkope vluchten naar ${region.name} — Vergelijk tickets`,
    description: `Vind de goedkoopste vluchten naar ${region.name}. Vergelijk honderden maatschappijen en boek direct bij de aanbieder.`,
  }
}

export default async function RegioPage({ params }: Props) {
  const { regio } = await params
  const region = getRegion(regio)
  if (!region) notFound()

  const regioDestinations = destinations.filter((d) => d.region === regio)
  const avgPrice = Math.round(regioDestinations.reduce((sum, d) => sum + d.avgPrice, 0) / regioDestinations.length)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span>/</span>
          <Link href="/bestemmingen" className="hover:text-slate-700">Bestemmingen</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{region.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative text-white py-14 px-4 overflow-hidden min-h-56">
        <Image src={region.photo} alt={region.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />
        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold drop-shadow mb-2">
            Goedkope vluchten naar {region.name}
          </h1>
          <p className="text-white/65 mb-6 max-w-xl">{region.description}</p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
              <div className="text-xs text-white/50 uppercase tracking-wide">Gemiddeld vanaf</div>
              <div className="text-2xl font-bold">&euro;{avgPrice}</div>
              <div className="text-xs text-white/50">per persoon retour</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
              <div className="text-xs text-white/50 uppercase tracking-wide">Bestemmingen</div>
              <div className="text-2xl font-bold">{regioDestinations.length}</div>
              <div className="text-xs text-white/50">beschikbaar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Alle bestemmingen in {region.name}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {regioDestinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </section>

      {/* Other regions */}
      <section className="bg-slate-50 border-t border-slate-200 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-bold text-slate-900 mb-5">Andere regio&#39;s</h2>
          <div className="flex flex-wrap gap-3">
            {regions
              .filter((r) => r.slug !== regio)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/bestemmingen/${r.slug}`}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-[#05428C] hover:text-[#05428C] transition-colors"
                >
                  {r.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
