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

  const title = `Goedkoop naar ${dest.city} vliegen — wanneer boek je het slimst?`
  const description = `Alles wat je moet weten over vluchten naar ${dest.city}: wanneer boeken, vanwaar vertrekken en welke aanbieder nu het goedkoopst is. Richtprijs v.a. €${dest.avgPrice}.`

  return {
    title,
    description,
    keywords: [
      `vluchten naar ${dest.city.toLowerCase()}`,
      `goedkope vluchten ${dest.city.toLowerCase()}`,
      `vliegtickets ${dest.city.toLowerCase()}`,
    ],
    openGraph: { title, description },
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
      a: `Vanuit Nederland vliegen onder andere ${dest.airlines.join(", ")} op ${dest.city}.`,
    },
    {
      q: `Wanneer is de beste tijd om naar ${dest.city} te vliegen?`,
      a: `De beste maanden om naar ${dest.city} te reizen zijn ${dest.bestMonths.join(", ")}.`,
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span>/</span>
          <Link href="/goedkope-vluchten" className="hover:text-slate-700">Vluchten</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{dest.city}</span>
        </div>
      </div>

      {/* Hero with photo */}
      <div className="relative text-white py-16 px-4 overflow-hidden min-h-64">
        <Image src={dest.photo} alt={dest.city} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold drop-shadow mb-2">
            Goedkoop naar {dest.city} vliegen
          </h1>
          <p className="text-white/60 mt-1 mb-4">{dest.country} &middot; {dest.iata}</p>
          <p className="text-white/70 mb-6 max-w-2xl text-base">{dest.description}</p>

          <div className="flex flex-wrap gap-3">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
              <div className="text-xs text-white/50 uppercase tracking-wide">Vanaf</div>
              <div className="text-2xl font-bold text-white">&euro;{dest.avgPrice}</div>
              <div className="text-xs text-white/50">per persoon</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
              <div className="text-xs text-white/50 uppercase tracking-wide">Vliegtijd</div>
              <div className="text-2xl font-bold text-white">
                {dest.flightTimeHours}u{dest.flightTimeMin > 0 ? `${dest.flightTimeMin}m` : ""}
              </div>
              <div className="text-xs text-white/50">vanuit AMS</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
              <div className="text-xs text-white/50 uppercase tracking-wide">Beste maanden</div>
              <div className="text-base font-bold text-white capitalize">{dest.bestMonths.slice(0, 2).join(", ")}</div>
              <div className="text-xs text-white/50">&amp; meer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Slim boeken blok */}
            <div className="bg-[#05428C]/5 border border-[#05428C]/15 rounded-xl p-6">
              <h2 className="font-bold text-slate-900 text-lg mb-4">
                Wanneer boek je het goedkoopst naar {dest.city}?
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Beste maanden</div>
                  <div className="text-sm text-slate-700 capitalize">{dest.bestMonths.join(", ")}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Beste vliegdag</div>
                  <div className="text-sm text-slate-700">Dinsdag of woensdag — gemiddeld €30–50 goedkoper</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Hoe ver vooruit boeken</div>
                  <div className="text-sm text-slate-700">
                    {dest.flightTimeHours >= 6 ? "2–4 maanden van tevoren" : "4–8 weken van tevoren"}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Vliegtijd vanuit AMS</div>
                  <div className="text-sm text-slate-700">
                    {dest.flightTimeHours}u{dest.flightTimeMin > 0 ? ` ${dest.flightTimeMin}m` : ""} — {dest.flightTimeHours < 3 ? "directe vluchten beschikbaar" : dest.flightTimeHours < 6 ? "vaak directe verbinding" : "vrijwel altijd met tussenstop"}
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Vergelijk vluchten naar {dest.city}</h2>
              <SearchWidget defaultDestination={dest.city} defaultDestinationCode={dest.iata} compact />
            </div>

            {/* Affiliate comparison */}
            <AffiliateWidget destinationCity={dest.city} destinationIata={dest.iata} avgPrice={dest.avgPrice} />

            {/* About */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="font-bold text-xl text-slate-900 mb-3">Over {dest.city}</h2>
              <p className="text-slate-600 leading-relaxed">{dest.longDescription}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Luchtvaartmaatschappijen</h3>
                  <ul className="space-y-1.5">
                    {dest.airlines.map((a) => (
                      <li key={a} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-400 inline-block shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Beste reismaanden</h3>
                  <div className="flex flex-wrap gap-2">
                    {dest.bestMonths.map((m) => (
                      <span key={m} className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold capitalize">
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
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h2 className="font-bold text-lg text-slate-900 mb-4">Tips voor vluchten naar {dest.city}</h2>
              <ul className="space-y-3">
                {dest.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs shrink-0">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
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
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Vluchten naar {dest.city}</h3>
              <div className="space-y-2">
                {dest.popularRoutes.map((route) => (
                  <a
                    key={route.fromIata}
                    href={`https://www.skyscanner.nl/transport/vluchten/${route.fromIata.toLowerCase()}/${dest.iata.toLowerCase()}/?utm_source=vluchten_ai&utm_medium=affiliate`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group"
                  >
                    <div className="text-sm">
                      <div className="font-semibold text-slate-900">{route.from} &rarr; {dest.city}</div>
                      <div className="text-slate-400 text-xs">{route.fromIata} &rarr; {dest.iata}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">&euro;{route.price}</div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-600">Bekijk</div>
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
