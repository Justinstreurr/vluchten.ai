import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { airlines } from "@/data/airlines"

export const metadata: Metadata = {
  title: "Luchtvaartmaatschappijen — Overzicht & handbagage regels",
  description:
    "Overzicht van alle luchtvaartmaatschappijen die vliegen vanuit Nederland. Vergelijk handbagage regels, bestemmingen en tarieven.",
}

const TYPE_LABELS = {
  fullservice: "Full service",
  lowcost: "Low cost",
  charter: "Charter",
}

const TYPE_COLORS = {
  fullservice: "bg-blue-100 text-blue-700",
  lowcost: "bg-green-100 text-green-700",
  charter: "bg-orange-100 text-orange-700",
}

export default function AirlinesPage() {
  return (
    <>
      <section className="bg-[#05428C] pt-8 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-2">Luchtvaartmaatschappijen</h1>
          <p className="text-sm text-white/60">
            Vergelijk handbagage regels, vluchten en tarieven per maatschappij.
          </p>
        </div>
      </section>

      {/* Airline cards */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {airlines.map((airline) => (
            <Link
              key={airline.slug}
              href={`/airlines/${airline.slug}`}
              className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <Image src="/icon-plane.png" alt="" width={24} height={24} className="w-6 h-6 object-contain opacity-50" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                      {airline.name}
                    </h2>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${TYPE_COLORS[airline.type]}`}>
                      {TYPE_LABELS[airline.type]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{airline.country} &middot; IATA: {airline.iata}</p>
                  <p className="text-sm text-slate-600 line-clamp-2">{airline.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span>{airline.destinations} bestemmingen</span>
                    <span>{airline.baggage.handbagage.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Side-by-side</p>
          <h2 className="text-xl font-bold text-slate-900">Vergelijkingstabel handbagage &amp; tarieven</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3.5 font-semibold text-slate-700 min-w-[160px]">Maatschappij</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-700 min-w-[80px]">Type</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-700 min-w-[200px]">Handbagage</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-700 min-w-[200px]">Ruimbagage</th>
                <th className="text-right px-5 py-3.5 font-semibold text-slate-700 min-w-[100px]">Bestemmingen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {airlines.map((airline) => (
                <tr key={airline.slug} className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/airlines/${airline.slug}`} className="font-medium text-slate-900 hover:text-[#05428C] transition-colors">
                      {airline.name}
                    </Link>
                    <div className="text-xs text-slate-400 mt-0.5">{airline.country}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${TYPE_COLORS[airline.type]}`}>
                      {TYPE_LABELS[airline.type]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{airline.baggage.handbagage}</td>
                  <td className="px-5 py-4 text-slate-600">{airline.baggage.ruimbagage}</td>
                  <td className="px-5 py-4 text-right font-semibold text-slate-800">{airline.destinations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Bagage regels kunnen per tarief en route afwijken. Controleer altijd de actuele regels op de website van de maatschappij.
        </p>
      </section>
    </>
  )
}
