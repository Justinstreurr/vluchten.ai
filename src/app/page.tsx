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
  title: "Vluchten.ai — Slim vliegen begint hier",
  description:
    "Ontdek wanneer je moet boeken, vanwaar je het goedkoopst vertrekt en welke aanbieder nu de laagste prijs heeft. Nederlandstalige reisgids voor slimme vliegers. 100% gratis.",
}

const faqItems = [
  {
    q: "Wanneer is het goedkoopst om een vlucht te boeken?",
    a: "Voor Europese bestemmingen boek je het beste 4–8 weken van tevoren. Voor intercontinentale vluchten is 2–4 maanden vooruit ideaal. Vlieg je op dinsdag of woensdag? Dan betaal je gemiddeld €30–50 minder dan in het weekend.",
  },
  {
    q: "Is vluchten.ai gratis?",
    a: "Ja, vluchten.ai is volledig gratis. Je betaalt nooit iets voor onze reisgidsen of het vergelijken van vluchten. Wanneer je via onze links boekt bij Skyscanner, Kiwi.com of Booking.com, ontvangen wij soms een kleine commissie van de aanbieder — jij betaalt daar niets extra voor.",
  },
  {
    q: "Welke aanbieders vergelijkt vluchten.ai?",
    a: "Wij vergelijken via Skyscanner, Kiwi.com en Booking.com. Je wordt altijd doorgestuurd naar de officiële website van de aanbieder om te boeken. Wij slaan geen betalingsgegevens op.",
  },
  {
    q: "Vanwaar is het goedkoopst vliegen vanuit Nederland?",
    a: "Amsterdam Schiphol heeft de meeste verbindingen en vaak de scherpste prijzen door de concurrentie. Eindhoven Airport is voor sommige Europese bestemmingen goedkoper via Ryanair. Rotterdam The Hague Airport heeft beperkt aanbod maar kan interessant zijn voor vakantievluchten.",
  },
  {
    q: "Hoe weet ik of ik een goede prijs heb?",
    a: "Vergelijk altijd minimaal drie aanbieders. Een goede vuistregel: als de prijs meer dan 20% lager is dan het gemiddelde van de afgelopen weken, is het een echte deal. Onze reisgidsen per bestemming geven je een richtprijs per maand.",
  },
  {
    q: "Verschilt de prijs per dag van de week?",
    a: "Ja, merkbaar. Vluchten die vertrekken op dinsdag, woensdag of vroeg op zaterdag zijn gemiddeld het goedkoopst. Vrijdagavond en zondagavond zijn traditioneel het duurst. Hetzelfde geldt voor het moment van boeken: ook op dinsdag en woensdag zijn nieuwe prijsdalingen het meest gebruikelijk.",
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
      <section className="bg-[#05428C] pt-10 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
            Slim vliegen begint hier.
          </h1>
          <p className="text-sm text-white/70 mb-7 max-w-xl mx-auto leading-relaxed">
            Ontdek wanneer je moet boeken, vanwaar je het goedkoopst vertrekt en welke aanbieder nu de laagste prijs heeft. Wij vergelijken — jij boekt.
          </p>

          <div className="max-w-4xl mx-auto mb-6">
            <SearchWidget />
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/tips/beste-boekingstijd"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Bekijk reisgidsen
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <TrustStrip />

      {/* ── USP ROW ── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-7 grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
          {[
            { value: "100%", label: "Nederlandstalig advies" },
            { value: "Onafhankelijk", label: "Geen voorkeur voor aanbieder" },
            { value: "Gratis", label: "Geen verborgen kosten" },
            { value: "Direct", label: "Altijd bij de officiële aanbieder" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4 py-2">
              <div className="text-lg font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-400 mt-0.5 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAIRE ROUTES ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Populaire routes</p>
              <h2 className="text-2xl font-bold text-slate-900">Wat vliegers nu boeken</h2>
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
          <h2 className="text-2xl font-bold text-white text-center mb-3">Hoe werkt vluchten.ai?</h2>
          <p className="text-white/55 text-sm text-center mb-12 max-w-lg mx-auto">
            Wij zijn geen boekingstool. Wij zijn de gids die je helpt de juiste beslissing te nemen — daarna sturen we je door.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Wij geven je advies",
                desc: "Onze reisgidsen vertellen je wanneer je moet boeken, vanwaar je het goedkoopst vertrekt en welke maatschappij bij jou past.",
              },
              {
                step: 2,
                title: "Jij vergelijkt de prijzen",
                desc: "Vul je reisgegevens in en zie direct welke aanbieder — Skyscanner, Kiwi.com of Booking.com — nu de laagste prijs heeft.",
              },
              {
                step: 3,
                title: "Wij sturen je door",
                desc: "Je boekt altijd rechtstreeks bij de aanbieder. Wij verdienen een kleine commissie als je boekt — jij betaalt niks extra.",
              },
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
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Prijzen gedaald</p>
              <h2 className="text-2xl font-bold text-slate-900">Last-minute kansen</h2>
            </div>
            <Link href="/goedkope-vluchten" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors hidden sm:block">
              Alle bestemmingen &rarr;
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
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Indicatieve richtprijzen</p>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">
                Vliegen in {currentMonth.nameNL} {currentMonth.year}
              </h2>
            </div>
            <Link href={`/goedkope-vluchten/${currentMonth.slug}`} className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors hidden sm:block">
              Meer deals &rarr;
            </Link>
          </div>

          <div className="bg-slate-100 border border-slate-200 rounded-lg px-5 py-4 mb-8">
            <p className="text-sm text-slate-600 leading-relaxed">{currentMonth.tip}</p>
          </div>

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

      {/* ── ALLE BESTEMMINGEN ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Overzicht</p>
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

      {/* ── REISGIDSEN ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Onafhankelijk advies</p>
              <h2 className="text-2xl font-bold text-slate-900">Reisgidsen &amp; tips</h2>
            </div>
            <Link href="/tips" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors hidden sm:block">
              Alle reisgidsen &rarr;
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
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Waarom vluchten.ai?</p>
            <h2 className="text-2xl font-bold text-slate-900">Een eerlijke reisgids, geen verkooptool</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
              Wij verdienen alleen iets als jij tevreden boekt. Dat houdt ons scherp.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
                title: "100% Nederlandstalig",
                desc: "Advies in je eigen taal, geschreven voor reizigers vanuit Nederland.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "Onafhankelijk",
                desc: "Wij hebben geen voorkeur voor Skyscanner, Kiwi of Booking. Wij sturen je naar de goedkoopste.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
                title: "Direct bij de aanbieder",
                desc: "Je boekt altijd op de officiële site van Skyscanner, Kiwi of Booking. Nooit via een tussenpersoon.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Gratis voor jou",
                desc: "Wij verdienen een kleine commissie van de aanbieder als je boekt. Jij betaalt nooit meer dan normaal.",
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
            <h2 className="text-2xl font-bold text-slate-900">Slimmer vliegen in het kort</h2>
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
      <section className="bg-slate-50 py-20 px-4 border-t border-slate-200">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Klaar om slimmer te vliegen?</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Vind de laagste prijs. Gratis, altijd.
          </h2>
          <p className="text-slate-500 mb-10 text-base">
            Wij vergelijken Skyscanner, Kiwi.com en Booking.com zodat jij weet waar je het goedkoopst boekt.
          </p>
          <ScrollTopButton />
        </div>
      </section>
    </>
  )
}
