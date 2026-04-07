import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import SearchWidget from "@/components/SearchWidget"
import { months, getMonth } from "@/data/months"
import { getDestination } from "@/data/destinations"

type Props = {
  params: Promise<{ maand: string }>
}

export async function generateStaticParams() {
  return months.map((m) => ({ maand: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { maand } = await params
  const month = getMonth(maand)
  if (!month) return {}
  return {
    title: `Goedkope vluchten ${month.nameNL} ${month.year} — Beste deals`,
    description: `Vind de goedkoopste vluchten voor ${month.nameNL} ${month.year}. ${month.description}`,
  }
}

export default async function MonthPage({ params }: Props) {
  const { maand } = await params
  const month = getMonth(maand)
  if (!month) notFound()

  const currentIndex = months.findIndex((m) => m.slug === maand)
  const prevMonth = currentIndex > 0 ? months[currentIndex - 1] : null
  const nextMonth = currentIndex < months.length - 1 ? months[currentIndex + 1] : null

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span>/</span>
          <Link href="/goedkope-vluchten" className="hover:text-slate-700">Goedkope vluchten</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium capitalize">{month.nameNL}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#05428C] pt-8 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-2 capitalize">
            Goedkope vluchten {month.nameNL} {month.year}
          </h1>
          <p className="text-sm text-white/60 mb-6 max-w-2xl mx-auto">{month.description}</p>
          <SearchWidget />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tip banner */}
        <div className="bg-slate-100 border border-slate-200 rounded-lg px-5 py-4 mb-10">
          <p className="text-sm text-slate-600 leading-relaxed">{month.tip}</p>
        </div>

        {/* Top deals */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Hot deals</p>
          <h2 className="text-2xl font-bold text-slate-900">
            Top bestemmingen {month.nameNL} {month.year}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {month.topDestinations.map((deal, i) => {
            const dest = getDestination(deal.slug)
            return (
              <Link
                key={deal.slug}
                href={`/vluchten-naar/${deal.slug}`}
                className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold text-slate-900 text-lg">{deal.city}</div>
                    {dest && <div className="text-sm text-slate-500">{dest.country}</div>}
                  </div>
                  {i === 0 && (
                    <span className="text-xs font-semibold bg-[#F58A07]/10 text-[#F58A07] border border-[#F58A07]/25 px-2 py-0.5 rounded">
                      #1 Deal
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Retour vanuit AMS</div>
                    {dest && (
                      <div className="text-xs text-slate-400 mt-1">
                        {dest.flightTimeHours}u{dest.flightTimeMin > 0 ? ` ${dest.flightTimeMin}m` : ""} vlucht
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">v.a.</div>
                    <div className="text-2xl font-bold text-slate-900">&euro;{deal.price}</div>
                  </div>
                </div>

                <div className="mt-4 text-center py-2.5 rounded bg-[#05428C] text-white text-sm font-semibold group-hover:bg-[#03306B] transition-colors">
                  Bekijk vluchten
                </div>
              </Link>
            )
          })}
        </div>

        {/* Month navigation */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="text-sm font-semibold text-slate-500 self-center mr-2">Andere maanden:</span>
          {months.map((m) => (
            <Link
              key={m.slug}
              href={`/goedkope-vluchten/${m.slug}`}
              className={`px-4 py-1.5 rounded text-sm font-medium capitalize transition-colors border ${
                m.slug === maand
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {m.nameNL}
            </Link>
          ))}
        </div>

        {/* Prev/Next */}
        <div className="flex justify-between border-t border-slate-200 pt-6">
          {prevMonth ? (
            <Link href={`/goedkope-vluchten/${prevMonth.slug}`}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
              &larr; <span className="capitalize">{prevMonth.nameNL}</span>
            </Link>
          ) : <div />}
          {nextMonth && (
            <Link href={`/goedkope-vluchten/${nextMonth.slug}`}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
              <span className="capitalize">{nextMonth.nameNL}</span> &rarr;
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
