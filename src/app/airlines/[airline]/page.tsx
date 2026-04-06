import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { airlines, getAirline } from "@/data/airlines"

type Props = {
  params: Promise<{ airline: string }>
}

export async function generateStaticParams() {
  return airlines.map((a) => ({ airline: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { airline } = await params
  const a = getAirline(airline)
  if (!a) return {}

  return {
    title: `${a.name} — Vluchten, handbagage & info`,
    description: `Alles over ${a.name}: handbagage regels, bestemmingen en vluchten boeken. ${a.description}`,
  }
}

const TYPE_LABELS: Record<string, string> = {
  fullservice: "Full service",
  lowcost: "Low cost",
  charter: "Charter",
}

export default async function AirlinePage({ params }: Props) {
  const { airline } = await params
  const a = getAirline(airline)
  if (!a) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Airline",
    name: a.name,
    iataCode: a.iata,
    description: a.description,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-violet-600">Home</Link>
          <span>/</span>
          <Link href="/airlines" className="hover:text-violet-600">Airlines</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{a.name}</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-5xl backdrop-blur">
            {a.emoji}
          </div>
          <div>
            <div className="text-violet-300 text-sm font-medium mb-1">{TYPE_LABELS[a.type]} · {a.country}</div>
            <h1 className="text-3xl font-extrabold">{a.name}</h1>
            <p className="text-slate-300 mt-1">IATA: {a.iata} · {a.destinations} bestemmingen</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* About */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-xl text-slate-900 mb-3">Over {a.name}</h2>
          <p className="text-slate-600 leading-relaxed">{a.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {a.hubs.map((hub) => (
              <span key={hub} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-semibold">
                ✈ {hub}
              </span>
            ))}
          </div>
        </div>

        {/* Baggage rules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-xl text-slate-900 mb-5">🧳 Bagageregels {a.name}</h2>
          <div className="divide-y divide-slate-100">
            {[
              { label: "Handbagage", value: a.baggage.handbagage, icon: "👜" },
              { label: "Ruimbagage", value: a.baggage.ruimbagage, icon: "🧳" },
              { label: "23 kg koffer", value: a.baggage.ruimbagage23kg, icon: "📦" },
            ].map((item) => (
              <div key={item.label} className="py-4 flex gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-slate-900">{item.label}</div>
                  <div className="text-sm text-slate-600 mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Vluchten boeken bij {a.name}?</h2>
          <p className="text-violet-200 mb-6">
            Vergelijk prijzen en vind de beste deal via onze partners.
          </p>
          <a
            href={`https://www.skyscanner.nl/?utm_source=vluchten_ai&utm_medium=affiliate&utm_campaign=airline_${a.slug}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors"
          >
            🔍 Vergelijk vluchten bij {a.name}
          </a>
        </div>

        {/* Back */}
        <Link href="/airlines" className="text-sm text-violet-600 hover:text-violet-800 font-semibold">
          ← Alle luchtvaartmaatschappijen
        </Link>
      </div>
    </>
  )
}
