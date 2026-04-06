import type { Metadata } from "next"
import Link from "next/link"
import { tips } from "@/data/tips"

export const metadata: Metadata = {
  title: "Reisgidsen & Tips — Goedkoop vliegen en handbagage regels",
  description:
    "Praktische tips om goedkoper te vliegen, handbagage regels per maatschappij en informatie over de beste boekingstijd.",
}

export default function TipsPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Reisgidsen & Tips</h1>
          <p className="text-slate-300 text-lg">
            Alles wat je moet weten om slim en goedkoop te vliegen.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <Link
              key={tip.slug}
              href={`/tips/${tip.slug}`}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-md transition-all group"
            >
              <div className="text-4xl mb-4">{tip.emoji}</div>
              <div className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-1">
                {tip.category}
              </div>
              <h2 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-violet-700 transition-colors leading-snug">
                {tip.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{tip.description}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
                <span>📅 {new Date(tip.date).toLocaleDateString("nl-NL", { dateStyle: "long" })}</span>
                <span>·</span>
                <span>⏱ {tip.readTime} min lezen</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
