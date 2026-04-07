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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span>/</span>
          <Link href="/airlines" className="hover:text-slate-700">Airlines</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{a.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#05428C] pt-8 pb-10 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
          <div>
            <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">{TYPE_LABELS[a.type]} &middot; {a.country}</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{a.name}</h1>
            <p className="text-white/60 text-sm mt-1">IATA: {a.iata} &middot; {a.destinations} bestemmingen</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {/* About */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="font-bold text-xl text-slate-900 mb-3">Over {a.name}</h2>
          <p className="text-slate-600 leading-relaxed">{a.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {a.hubs.map((hub) => (
              <span key={hub} className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold">
                {hub}
              </span>
            ))}
          </div>
        </div>

        {/* Baggage rules */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="font-bold text-xl text-slate-900 mb-5">Bagageregels {a.name}</h2>
          <div className="divide-y divide-slate-100">
            {[
              { label: "Handbagage", value: a.baggage.handbagage },
              { label: "Ruimbagage", value: a.baggage.ruimbagage },
              { label: "23 kg koffer", value: a.baggage.ruimbagage23kg },
            ].map((item) => (
              <div key={item.label} className="py-4 flex gap-4">
                <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{item.label}</div>
                  <div className="text-sm text-slate-600 mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Vluchten boeken bij {a.name}?</h2>
          <p className="text-slate-400 text-sm mb-6">Vergelijk prijzen en vind de beste deal via onze partners.</p>
          <a
            href={`https://www.skyscanner.nl/?utm_source=vluchten_ai&utm_medium=affiliate&utm_campaign=airline_${a.slug}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#05428C] text-white font-semibold rounded hover:bg-[#03306B] transition-colors"
          >
            Vergelijk vluchten bij {a.name}
          </a>
        </div>

        <Link href="/airlines" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
          &larr; Alle luchtvaartmaatschappijen
        </Link>
      </div>
    </>
  )
}
