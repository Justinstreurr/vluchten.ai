"use client"

import Link from "next/link"
import { useState } from "react"
import { destinations } from "@/data/destinations"
import { months } from "@/data/months"

export default function Footer() {
  const popularDestinations = destinations.slice(0, 8)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <footer className="bg-[#05203c] text-slate-400">

      {/* Newsletter + App */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Newsletter */}
          <div>
            <div className="text-white font-extrabold text-xl mb-1">✉️ Prijsalerts in je inbox</div>
            <p className="text-sm text-slate-400 mb-5">
              Ontvang wekelijks de beste vliegdeals. Meld je gratis aan — uitschrijven wanneer je wilt.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                <span>✓</span> Gelukt! Je ontvangt binnenkort de beste deals.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-400 focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl transition-colors shrink-0"
                >
                  Aanmelden
                </button>
              </form>
            )}
          </div>

          {/* App promo */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">
              📱
            </div>
            <div>
              <div className="text-white font-bold mb-1">Vluchten.ai app — binnenkort</div>
              <p className="text-sm text-slate-400 mb-3">
                Zoek, vergelijk en ontvang prijsalerts direct op je telefoon.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  🍎 App Store
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  🤖 Google Play
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-white mb-3">
              <span>✈</span>
              <span>vluchten<span className="text-violet-400">.ai</span></span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              De slimste manier om vliegtickets te vergelijken en de goedkoopste vlucht te vinden.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                { label: "𝕏", href: "#" },
                { label: "in", href: "#" },
                { label: "📌", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-violet-600 flex items-center justify-center text-sm font-bold text-slate-300 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Populaire bestemmingen */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Populaire bestemmingen</h3>
            <ul className="space-y-2">
              {popularDestinations.map((d) => (
                <li key={d.slug}>
                  <Link href={`/vluchten-naar/${d.slug}`} className="text-sm hover:text-white transition-colors flex items-center justify-between group">
                    <span>Vluchten naar {d.city}</span>
                    <span className="text-violet-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">v.a. €{d.avgPrice}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Deals per maand */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Vluchten per maand</h3>
            <ul className="space-y-2">
              {months.slice(0, 8).map((m) => (
                <li key={m.slug}>
                  <Link href={`/goedkope-vluchten/${m.slug}`} className="text-sm hover:text-white transition-colors capitalize">
                    Vluchten {m.nameNL} {m.year}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Informatie</h3>
            <ul className="space-y-2">
              <li><Link href="/tips" className="text-sm hover:text-white transition-colors">Reisgidsen & Tips</Link></li>
              <li><Link href="/airlines" className="text-sm hover:text-white transition-colors">Luchtvaartmaatschappijen</Link></li>
              <li><Link href="/goedkope-vluchten" className="text-sm hover:text-white transition-colors">Goedkope vluchten</Link></li>
              <li><Link href="/tips/handbagage-regels" className="text-sm hover:text-white transition-colors">Handbagage regels 2026</Link></li>
              <li><Link href="/tips/goedkoop-vliegen" className="text-sm hover:text-white transition-colors">10 tips om goedkoop te vliegen</Link></li>
              <li><Link href="/tips/beste-boekingstijd" className="text-sm hover:text-white transition-colors">Beste boekingstijd</Link></li>
              <li><Link href="/tips/vliegvelden-nederland" className="text-sm hover:text-white transition-colors">Vliegvelden Nederland</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Gratis vergelijken</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Geen verborgen kosten</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Veilig boeken via erkende partners</span>
            <span className="flex items-center gap-1.5">
              <span className="flex gap-0.5 text-amber-400 text-xs">{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</span>
              Trustpilot 4,7/5
            </span>
          </div>
          <div className="flex gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacybeleid</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Gebruiksvoorwaarden</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-xs text-slate-600 text-center leading-relaxed">
            © 2026 vluchten.ai — Vluchten.ai is een vergelijkingswebsite, geen boekingsplatform.
            Bij het klikken op een aanbieder word je doorgestuurd naar een externe partij (Skyscanner, Kiwi.com of Booking.com).
            Vluchten.ai ontvangt mogelijk een affiliatecommissie bij een boeking. Prijzen zijn indicatief en kunnen variëren.
          </p>
        </div>
      </div>
    </footer>
  )
}
