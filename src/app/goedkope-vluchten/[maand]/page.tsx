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

  const title = `Goedkope vluchten ${month.nameNL} ${month.year} — Beste deals`
  const description = `Vind de goedkoopste vluchten voor ${month.nameNL} ${month.year}. ${month.description}`

  return { title, description }
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
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-violet-600">Home</Link>
          <span>/</span>
          <Link href="/goedkope-vluchten" className="hover:text-violet-600">Goedkope vluchten</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium capitalize">{month.nameNL}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 capitalize">
            Goedkope vluchten {month.nameNL} {month.year}
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">{month.description}</p>
          <SearchWidget />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tip banner */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-10">
          <span className="text-2xl">💡</span>
          <p className="text-amber-900 font-medium">{month.tip}</p>
        </div>

        {/* Top deals */}
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
          Top bestemmingen {month.nameNL} {month.year}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {month.topDestinations.map((deal, i) => {
            const dest = getDestination(deal.slug)
            return (
              <Link
                key={deal.slug}
                href={`/vluchten-naar/${deal.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{deal.emoji}</span>
                  <div>
                    <div className="font-extrabold text-slate-900 text-lg">{deal.city}</div>
                    {dest && <div className="text-sm text-slate-500">{dest.country}</div>}
                  </div>
                  {i === 0 && (
                    <span className="ml-auto text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      #1 Deal
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Retour vanuit AMS</div>
                    {dest && (
                      <div className="text-xs text-slate-400 mt-1">
                        ✈ {dest.flightTimeHours}u{dest.flightTimeMin > 0 ? ` ${dest.flightTimeMin}m` : ""}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">v.a.</div>
                    <div className="text-2xl font-extrabold text-violet-700">€{deal.price}</div>
                  </div>
                </div>

                <div className="mt-4 text-center py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold group-hover:bg-violet-700 transition-colors">
                  Bekijk vluchten →
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
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                m.slug === maand
                  ? "bg-violet-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700"
              }`}
            >
              {m.nameNL}
            </Link>
          ))}
        </div>

        {/* Prev/Next */}
        <div className="flex justify-between">
          {prevMonth ? (
            <Link
              href={`/goedkope-vluchten/${prevMonth.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
            >
              ← Goedkope vluchten <span className="capitalize">{prevMonth.nameNL}</span>
            </Link>
          ) : <div />}
          {nextMonth && (
            <Link
              href={`/goedkope-vluchten/${nextMonth.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
            >
              Goedkope vluchten <span className="capitalize">{nextMonth.nameNL}</span> →
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
