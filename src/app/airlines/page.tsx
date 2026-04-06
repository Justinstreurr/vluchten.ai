import type { Metadata } from "next"
import Link from "next/link"
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
      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Luchtvaartmaatschappijen</h1>
          <p className="text-slate-300 text-lg">
            Vergelijk handbagage regels, vluchten en tarieven per maatschappij.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {airlines.map((airline) => (
            <Link
              key={airline.slug}
              href={`/airlines/${airline.slug}`}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
                  {airline.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                      {airline.name}
                    </h2>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[airline.type]}`}>
                      {TYPE_LABELS[airline.type]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">{airline.country} · IATA: {airline.iata}</p>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">{airline.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span>✈ {airline.destinations} bestemmingen</span>
                    <span>🧳 {airline.baggage.handbagage.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
