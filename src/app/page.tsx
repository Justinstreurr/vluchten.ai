import Link from "next/link"
import SearchWidget from "@/components/SearchWidget"
import DestinationCard from "@/components/DestinationCard"
import TrustStrip from "@/components/TrustStrip"
import GuaranteeBadges from "@/components/GuaranteeBadges"
import ScrollTopButton from "@/components/ScrollTopButton"
import { destinations } from "@/data/destinations"
import { tips } from "@/data/tips"
import { months } from "@/data/months"

export default function Home() {
  const popularDestinations = destinations.slice(0, 10)
  const trendingDestinations = destinations.filter((d) => d.trending).slice(0, 4)
  const currentMonthIdx = new Date().getMonth()
  const currentMonth = months[currentMonthIdx]
  const latestTips = tips.slice(0, 3)

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#05203c] pt-14 pb-24 px-4">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Social proof pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-7 backdrop-blur-sm">
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
            </span>
            <span>Beoordeeld met 4,7 / 5 door 12.000+ reizigers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Goedkope vluchten?<br />
            <span className="text-violet-400">Vergelijk in seconden.</span>
          </h1>

          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Altijd de laagste prijs — we vergelijken Skyscanner, Kiwi.com, Booking.com en meer.
            Gratis. Geen bijkomende kosten.
          </p>

          <SearchWidget />
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <TrustStrip />

      {/* ─── GUARANTEE BADGES ─── */}
      <GuaranteeBadges />

      {/* ─── TRENDING ─── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="flex items-center gap-2 text-amber-500 text-sm font-bold uppercase tracking-wide mb-1">
              <span>🔥</span> Nu trending
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Meest gezochte vluchten</h2>
          </div>
          <Link href="/goedkope-vluchten" className="text-sm font-semibold text-violet-700 hover:text-violet-900 hidden sm:flex items-center gap-1">
            Alle bestemmingen <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {trendingDestinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </section>

      {/* ─── POPULAIRE BESTEMMINGEN ─── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Populaire bestemmingen</h2>
              <p className="text-slate-500 text-sm mt-1">Vanuit Nederland — indicatieve retourprijzen per persoon</p>
            </div>
            <Link href="/goedkope-vluchten" className="text-sm font-semibold text-violet-700 hover:text-violet-900 hidden sm:flex items-center gap-1">
              Alle bestemmingen <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularDestinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEALS VAN DE MAAND ─── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-violet-600 font-bold text-sm uppercase tracking-wide mb-1">Hot deals</div>
            <h2 className="text-2xl font-extrabold text-slate-900 capitalize">
              Goedkope vluchten {currentMonth.nameNL} {currentMonth.year}
            </h2>
          </div>
          <Link href={`/goedkope-vluchten/${currentMonth.slug}`} className="text-sm font-semibold text-violet-700 hover:text-violet-900 hidden sm:flex items-center gap-1 shrink-0">
            Alle deals <span>→</span>
          </Link>
        </div>

        <p className="text-slate-500 text-sm mb-5 max-w-xl">{currentMonth.description}</p>

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-7">
          <span className="text-xl mt-0.5">💡</span>
          <p className="text-sm text-amber-900 font-medium">{currentMonth.tip}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          {currentMonth.topDestinations.map((deal, i) => (
            <Link
              key={deal.slug}
              href={`/vluchten-naar/${deal.slug}`}
              className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border border-slate-100 hover:border-violet-200 group"
            >
              <span className="text-4xl">{deal.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  {deal.city}
                  {i === 0 && (
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">#1</span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Retour vanuit AMS</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400">v.a.</div>
                <div className="font-extrabold text-violet-700 text-lg">€{deal.price}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Month pills */}
        <div className="flex flex-wrap gap-2">
          {months.map((m) => (
            <Link
              key={m.slug}
              href={`/goedkope-vluchten/${m.slug}`}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors border ${
                m.slug === currentMonth.slug
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700"
              }`}
            >
              {m.nameNL}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── HOE HET WERKT ─── */}
      <section className="bg-[#05203c] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white text-center mb-12">Hoe werkt vluchten.ai?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "🔍", title: "Zoek je vlucht", desc: "Vul je vertrekplaats, bestemming en datum in. Wij zoeken direct bij honderden maatschappijen." },
              { step: "02", icon: "💰", title: "Vergelijk de prijzen", desc: "Zie in één overzicht de scherpste prijzen via Skyscanner, Kiwi.com, Booking.com en meer." },
              { step: "03", icon: "✅", title: "Boek direct & veilig", desc: "Klik door naar de aanbieder en boek rechtstreeks. Geen tussenpersoon, geen extra kosten." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-xs font-bold text-violet-400 tracking-widest mb-3">{item.step}</div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIPS & BLOG ─── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Reisgidsen & tips</h2>
            <p className="text-slate-500 text-sm mt-1">Slim vliegen begint met de juiste kennis</p>
          </div>
          <Link href="/tips" className="text-sm font-semibold text-violet-700 hover:text-violet-900 hidden sm:flex items-center gap-1">
            Alle tips <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestTips.map((tip) => (
            <Link
              key={tip.slug}
              href={`/tips/${tip.slug}`}
              className="group bg-white rounded-2xl p-6 hover:shadow-md border border-slate-100 hover:border-violet-200 transition-all"
            >
              <div className="text-3xl mb-3">{tip.emoji}</div>
              <div className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-1">{tip.category}</div>
              <h3 className="font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors leading-snug">
                {tip.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2">{tip.description}</p>
              <div className="mt-4 text-xs text-slate-400">{tip.readTime} min lezen</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-gradient-to-r from-violet-700 to-purple-700 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Klaar om te vliegen?</h2>
          <p className="text-violet-200 mb-8">
            Vergelijk nu vluchten en bespaar gemiddeld €47 per persoon.
          </p>
          <ScrollTopButton />
        </div>
      </section>
    </>
  )
}
