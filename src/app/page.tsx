import type { Metadata } from "next"
import Link from "next/link"
import SearchWidget from "@/components/SearchWidget"
import DestinationCard from "@/components/DestinationCard"
import TrustStrip from "@/components/TrustStrip"
import ScrollTopButton from "@/components/ScrollTopButton"
import { destinations } from "@/data/destinations"
import { regions } from "@/data/regions"
import { tips } from "@/data/tips"
import { months } from "@/data/months"

export const metadata: Metadata = {
  title: "Vluchten.ai — Vergelijk goedkope vliegtickets",
  description: "Vind de laagste prijs voor vliegtickets via Skyscanner, Kiwi.com, Booking.com en meer. Gratis vergelijken, direct boeken.",
}

const faqItems = [
  {
    q: "Hoe vind ik de goedkoopste vlucht?",
    a: "Boek op dinsdag of woensdag, minstens 6–8 weken van tevoren. Vermijd schoolvakanties en boek een retourvlucht in plaats van twee enkele vluchten. Vluchten.ai vergelijkt automatisch honderden maatschappijen zodat je altijd de laagste prijs ziet.",
  },
  {
    q: "Is vluchten.ai gratis te gebruiken?",
    a: "Ja, vluchten.ai is 100% gratis. Je betaalt nooit iets voor het vergelijken van vluchten. Wanneer je doorklikt naar een aanbieder zoals Skyscanner of Kiwi.com, betaal je alleen de prijs van het ticket.",
  },
  {
    q: "Wanneer is het het goedkoopst om te vliegen?",
    a: "Doordeweekse vluchten (dinsdag, woensdag) zijn gemiddeld 15–20% goedkoper dan weekendvluchten. Vroege ochtend- en late avondvluchten zijn vaak voordeliger. In het laagseizoen (najaar en winter, buiten feestdagen) zijn tickets gemiddeld 30% goedkoper.",
  },
  {
    q: "Welke vluchtzoekers vergelijkt vluchten.ai?",
    a: "Vluchten.ai vergelijkt via Skyscanner, Kiwi.com en Booking.com — drie van de grootste en meest betrouwbare vluchtzoekers ter wereld. Je wordt altijd doorgestuurd naar de officiële website van de aanbieder om te boeken.",
  },
  {
    q: "Hoe lang van tevoren moet ik een vlucht boeken?",
    a: "Voor Europese bestemmingen is 4–8 weken van tevoren ideaal. Voor intercontinentale vluchten (VS, Azië) boek je het beste 3–6 maanden van tevoren. Last-minute tickets kunnen soms goedkoper zijn, maar dat is een gok.",
  },
  {
    q: "Zijn de prijzen op vluchten.ai actueel?",
    a: "Vluchten.ai toont actuele prijzen via live koppelingen met Skyscanner, Kiwi.com en Booking.com. Prijzen kunnen fluctueren — de definitieve prijs zie je altijd bij de aanbieder zelf.",
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

export default function Home() {
  const trending = destinations.filter((d) => d.trending).slice(0, 7)
  const popular = destinations.slice(0, 10)
  const lastMinuteDeals = destinations.filter((d) => d.lastMinute)
  const currentMonth = months[new Date().getMonth()]
  const latestTips = tips.slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="bg-[#05428C] pt-8 pb-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-2">
            Vergelijk en boek goedkope vliegtickets
          </h1>
          <p className="text-sm text-white/60 mb-6">
            Vind de laagste prijs via Skyscanner, Kiwi.com, Booking.com en meer. Gratis.
          </p>

          <div className="max-w-4xl mx-auto">
            <SearchWidget />
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <TrustStrip />

      {/* ── STATS ROW ── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
          {[
            { value: "500+", label: "Bestemmingen" },
            { value: "200+", label: "Maatschappijen" },
            { value: "€0", label: "Vergelijkingskosten" },
            { value: "24/7", label: "Beschikbaar" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4 py-2">
              <div className="text-2xl font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRENDING — horizontal scroll ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Nu trending</p>
              <h2 className="text-2xl font-bold text-slate-900">Meest gezochte bestemmingen</h2>
            </div>
            <Link href="/goedkope-vluchten" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors hidden sm:block">
              Alle bestemmingen &rarr;
            </Link>
          </div>
        </div>

        <div className="scroll-x flex gap-4 px-4 md:px-[calc((100vw-72rem)/2+1rem)] pb-3">
          {trending.map((d) => (
            <div key={d.slug} className="snap-start shrink-0 w-56 sm:w-64">
              <DestinationCard destination={d} />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOE HET WERKT ── */}
      <section className="bg-[#06428C] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Hoe werkt vluchten.ai?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Zoek je vlucht", desc: "Vul je vertrekplaats, bestemming en datum in. Wij zoeken direct bij honderden maatschappijen." },
              { step: 2, title: "Vergelijk de prijzen", desc: "Zie in één overzicht de scherpste prijzen via Skyscanner, Kiwi.com, Booking.com en meer." },
              { step: 3, title: "Boek direct & veilig", desc: "Klik door naar de aanbieder en boek rechtstreeks. Geen tussenpersoon, geen extra kosten." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAST MINUTE DEALS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Vertrek binnen 14 dagen</p>
              <h2 className="text-2xl font-bold text-slate-900">Last-minute deals</h2>
            </div>
            <Link href="/goedkope-vluchten" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors hidden sm:block">
              Alle deals &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lastMinuteDeals.map((d) => (
              <Link key={d.slug} href={`/vluchten-naar/${d.slug}`}
                className="group bg-white rounded-lg border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 group-hover:text-slate-700">{d.city}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{d.country} &middot; {d.flightTimeHours}u{d.flightTimeMin > 0 ? `${d.flightTimeMin}m` : ""} vliegen</div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  {d.priceTrend < 0 && (
                    <div className="text-[10px] font-semibold text-[#F58A07] border border-[#F58A07]/30 bg-[#F58A07]/8 px-1.5 py-0.5 rounded mb-1 inline-block">
                      {Math.abs(d.priceTrend)}% goedkoper
                    </div>
                  )}
                  <div className="text-xl font-bold text-slate-900">&euro;{d.avgPrice}</div>
                  <div className="text-[11px] text-slate-400">per persoon</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEALS VAN DE MAAND ── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Actuele deals</p>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">
                Vluchten {currentMonth.nameNL} {currentMonth.year}
              </h2>
            </div>
            <Link href={`/goedkope-vluchten/${currentMonth.slug}`} className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors hidden sm:block">
              Alle deals &rarr;
            </Link>
          </div>

          {/* Tip */}
          <div className="bg-slate-100 border border-slate-200 rounded-lg px-5 py-4 mb-8">
            <p className="text-sm text-slate-600 leading-relaxed">{currentMonth.tip}</p>
          </div>

          {/* Deal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {currentMonth.topDestinations.map((deal, i) => (
              <Link key={deal.slug} href={`/vluchten-naar/${deal.slug}`}
                className="group bg-white rounded-lg border border-slate-200 p-5 flex items-center justify-between hover:border-slate-300 hover:shadow-md transition-all">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    {deal.city}
                    {i === 0 && <span className="text-[10px] font-semibold bg-[#F58A07]/10 text-[#F58A07] border border-[#F58A07]/25 px-1.5 py-0.5 rounded">Best deal</span>}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Retour vanuit Amsterdam</div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-[11px] text-slate-400">v.a.</div>
                  <div className="text-xl font-bold text-slate-900">&euro;{deal.price}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Month pills */}
          <div className="flex flex-wrap gap-2">
            {months.map((m) => (
              <Link key={m.slug} href={`/goedkope-vluchten/${m.slug}`}
                className={`px-4 py-1.5 rounded text-sm font-medium capitalize transition-all border ${
                  m.slug === currentMonth.slug
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}>
                {m.nameNL}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAIRE BESTEMMINGEN ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Ontdek</p>
              <h2 className="text-2xl font-bold text-slate-900">Populaire bestemmingen</h2>
            </div>
            <Link href="/goedkope-vluchten" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors hidden sm:block">
              Alle bestemmingen &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {popular.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── REGIO HUBS ── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Per regio</p>
            <h2 className="text-2xl font-bold text-slate-900">Vluchten per regio</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {regions.map((r) => (
              <Link key={r.slug} href={`/bestemmingen/${r.slug}`}
                className="group relative rounded-lg overflow-hidden aspect-[4/3] flex items-end">
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.photo} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="relative p-3">
                  <div className="font-semibold text-white text-sm">{r.name}</div>
                  <div className="text-white/60 text-xs mt-0.5">
                    {destinations.filter((d) => d.region === r.slug).length} bestemmingen
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIPS & BLOG ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Kennisbank</p>
              <h2 className="text-2xl font-bold text-slate-900">Reisgidsen &amp; tips</h2>
            </div>
            <Link href="/tips" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors hidden sm:block">
              Alle tips &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestTips.map((tip, i) => (
              <Link key={tip.slug} href={`/tips/${tip.slug}`}
                className={`group rounded-lg border transition-all hover:shadow-md ${
                  i === 0
                    ? "bg-slate-800 border-transparent p-7"
                    : "bg-white border-slate-200 hover:border-slate-300 p-6"
                }`}>
                <div className={`text-xs font-semibold uppercase tracking-widest mb-3 ${i === 0 ? "text-slate-400" : "text-slate-500"}`}>
                  {tip.category}
                </div>
                <h3 className={`font-semibold text-lg leading-snug mb-2 ${i === 0 ? "text-white" : "text-slate-900 group-hover:text-slate-700"} transition-colors`}>
                  {tip.title}
                </h3>
                <p className={`text-sm leading-relaxed line-clamp-2 ${i === 0 ? "text-white/55" : "text-slate-500"}`}>
                  {tip.description}
                </p>
                <div className={`mt-4 text-xs ${i === 0 ? "text-white/35" : "text-slate-300"}`}>
                  {tip.readTime} min lezen
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAAROM VLUCHTEN.AI ── */}
      <section className="py-16 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Vertrouwd door duizenden reizigers</p>
            <h2 className="text-2xl font-bold text-slate-900">Waarom vluchten.ai?</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "100% gratis",
                desc: "Vergelijken kost nooit iets. Je betaalt alleen de prijs van je ticket.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "200+ maatschappijen",
                desc: "We doorzoeken honderden luchtvaartmaatschappijen in seconden.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
                title: "Veilig boeken",
                desc: "Je boekt altijd direct bij erkende partners. Geen tussenpersoon.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                ),
                title: "Geen verborgen kosten",
                desc: "De prijs die je ziet is de prijs die je betaalt. Geen verrassingen.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="w-10 h-10 bg-[#05428C]/10 text-[#05428C] rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Veelgestelde vragen</p>
            <h2 className="text-2xl font-bold text-slate-900">Alles over goedkoop vliegen</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {faqItems.map((item, i) => (
              <div key={i} className="py-5">
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-slate-50 py-24 px-4 border-t border-slate-200">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Klaar om te boeken?</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Vind jouw goedkoopste vlucht.
          </h2>
          <p className="text-slate-500 mb-10 text-base">
            Gemiddeld &euro;47 bespaard per persoon. Gratis. Altijd.
          </p>
          <ScrollTopButton />
        </div>
      </section>
    </>
  )
}
