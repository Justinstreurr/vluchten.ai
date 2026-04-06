import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import SearchWidget from "@/components/SearchWidget"
import AffiliateWidget from "@/components/AffiliateWidget"
import DestinationCard from "@/components/DestinationCard"
import PriceChart from "@/components/PriceChart"
import { destinations, getDestination } from "@/data/destinations"

type Props = {
  params: Promise<{ stad: string }>
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ stad: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stad } = await params
  const dest = getDestination(stad)
  if (!dest) return {}

  const title = `Vluchten naar ${dest.city} — Goedkope tickets v.a. €${dest.avgPrice}`
  const description = `Vergelijk vluchten naar ${dest.city}, ${dest.country}. Vind de goedkoopste tickets v.a. €${dest.avgPrice} via Skyscanner, Kiwi.com en meer. Vliegtijd: ${dest.flightTimeHours}u${dest.flightTimeMin > 0 ? ` ${dest.flightTimeMin}m` : ""}.`

  return {
    title,
    description,
    keywords: [
      `vluchten naar ${dest.city.toLowerCase()}`,
      `goedkope vluchten ${dest.city.toLowerCase()}`,
      `vliegtickets ${dest.city.toLowerCase()}`,
      `vluchten van amsterdam naar ${dest.city.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
    },
  }
}

export default async function DestinationPage({ params }: Props) {
  const { stad } = await params
  const dest = getDestination(stad)
  if (!dest) notFound()

  const relatedDestinations = dest.nearbyDestinations
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter(Boolean) as typeof destinations

  const faqItems = [
    {
      q: `Wat kost een vlucht naar ${dest.city}?`,
      a: `Een retourvlucht naar ${dest.city} kost gemiddeld €${dest.avgPrice} per persoon. De prijs varieert per maand, maatschappij en boekingstijdstip. In het laagseizoen kun je al tickets vinden voor €${Math.round(dest.avgPrice * 0.7)}.`,
    },
    {
      q: `Hoe lang vliegen naar ${dest.city}?`,
      a: `Een directe vlucht van Amsterdam (AMS) naar ${dest.city} (${dest.iata}) duurt ongeveer ${dest.flightTimeHours} uur${dest.flightTimeMin > 0 ? ` en ${dest.flightTimeMin} minuten` : ""}. Bij vluchten met een tussenstop kan de totale reistijd aanzienlijk langer zijn.`,
    },
    {
      q: `Welke luchtvaartmaatschappijen vliegen op ${dest.city}?`,
      a: `Vanuit Nederland vliegen onder andere ${dest.airlines.join(", ")} op ${dest.city}. De beschikbaarheid kan variëren per seizoen.`,
    },
    {
      q: `Wanneer is de beste tijd om naar ${dest.city} te vliegen?`,
      a: `De beste maanden om naar ${dest.city} te reizen zijn ${dest.bestMonths.join(", ")}. In deze periode is het weer aangenaam en zijn de vliegprijzen vaak lager dan in het hoogseizoen.`,
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-violet-600">Home</Link>
          <span>/</span>
          <Link href="/goedkope-vluchten" className="hover:text-violet-600">Vluchten</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{dest.city}</span>
        </div>
      </div>

      {/* Hero with real photo */}
      <div className="relative text-white py-16 px-4 overflow-hidden min-h-64">
        <Image
          src={dest.photo}
          alt={dest.city}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05203c]/90 via-[#05203c]/70 to-transparent" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl drop-shadow-lg">{dest.emoji}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow">
                Vluchten naar {dest.city}
              </h1>
              <p className="text-white/70 mt-1">{dest.country} · {dest.iata}</p>
            </div>
          </div>
          <p className="text-white/75 mt-3 mb-6 max-w-2xl text-lg">{dest.description}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Vanaf</div>
              <div className="text-2xl font-extrabold text-white">€{dest.avgPrice}</div>
              <div className="text-xs text-slate-400">per persoon</div>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Vliegtijd</div>
              <div className="text-2xl font-extrabold text-white">
                {dest.flightTimeHours}u{dest.flightTimeMin > 0 ? `${dest.flightTimeMin}m` : ""}
              </div>
              <div className="text-xs text-slate-400">vanuit AMS</div>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Beste maanden</div>
              <div className="text-base font-bold text-white capitalize">{dest.bestMonths.slice(0, 2).join(", ")}</div>
              <div className="text-xs text-slate-400">&amp; meer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Zoek vluchten naar {dest.city}</h2>
              <SearchWidget
                defaultDestination={dest.city}
                defaultDestinationCode={dest.iata}
                compact
              />
            </div>

            {/* Affiliate comparison */}
            <AffiliateWidget
              destinationCity={dest.city}
              destinationIata={dest.iata}
              avgPrice={dest.avgPrice}
            />

            {/* About destination */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-bold text-xl text-slate-900 mb-3">Over {dest.city}</h2>
              <p className="text-slate-600 leading-relaxed">{dest.longDescription}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">✈ Airlines</h3>
                  <ul className="space-y-1.5">
                    {dest.airlines.map((a) => (
                      <li key={a} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">📅 Beste reismaanden</h3>
                  <div className="flex flex-wrap gap-2">
                    {dest.bestMonths.map((m) => (
                      <span key={m} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-semibold capitalize">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price chart */}
            <PriceChart avgPrice={dest.avgPrice} city={dest.city} />

            {/* Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="font-bold text-lg text-amber-900 mb-4">💡 Tips voor vluchten naar {dest.city}</h2>
              <ul className="space-y-3">
                {dest.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-amber-800">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-bold text-xl text-slate-900 mb-6">Veelgestelde vragen</h2>
              <div className="space-y-5">
                {faqItems.map((item, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular routes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Vluchten naar {dest.city}</h3>
              <div className="space-y-3">
                {dest.popularRoutes.map((route) => (
                  <a
                    key={route.fromIata}
                    href={`https://www.skyscanner.nl/transport/vluchten/${route.fromIata.toLowerCase()}/${dest.iata.toLowerCase()}/?utm_source=vluchten_ai&utm_medium=affiliate`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-violet-50 border border-slate-100 hover:border-violet-200 transition-all group"
                  >
                    <div className="text-sm">
                      <div className="font-semibold text-slate-900">{route.from} → {dest.city}</div>
                      <div className="text-slate-500 text-xs">{route.fromIata} → {dest.iata}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-violet-700">€{route.price}</div>
                      <div className="text-xs text-slate-400 group-hover:text-violet-600">Bekijk →</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Related destinations */}
            {relatedDestinations.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Vergelijkbare bestemmingen</h3>
                <div className="space-y-3">
                  {relatedDestinations.map((rd) => (
                    <DestinationCard key={rd.slug} destination={rd} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
