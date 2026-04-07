import type { Metadata } from "next"
import Link from "next/link"
import { tips } from "@/data/tips"

export const metadata: Metadata = {
  title: "Reisgidsen — Wanneer boeken, vanwaar vliegen en hoe besparen",
  description:
    "Onze reisgidsen helpen je slim beslissen: wanneer boek je, vanwaar vlieg je het goedkoopst en welke maatschappij past bij jou? Geen reclame, wel eerlijk advies.",
}

export default function TipsPage() {
  return (
    <>
      <section className="bg-[#05428C] pt-8 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-2">Reisgidsen</h1>
          <p className="text-sm text-white/65 max-w-lg mx-auto leading-relaxed">
            Onze reisgidsen helpen je slim beslissen: wanneer boek je, vanwaar vlieg je het goedkoopst en welke maatschappij past bij jou? Geen reclame, wel eerlijk advies.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tips.map((tip) => (
            <Link
              key={tip.slug}
              href={`/tips/${tip.slug}`}
              className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                {tip.category}
              </div>
              <h2 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-slate-700 transition-colors leading-snug">
                {tip.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{tip.description}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
                <span suppressHydrationWarning>{new Date(tip.date).toLocaleDateString("nl-NL", { dateStyle: "long" })}</span>
                <span>&middot;</span>
                <span>{tip.readTime} min lezen</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
