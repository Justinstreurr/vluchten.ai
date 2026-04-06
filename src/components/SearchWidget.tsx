"use client"

import { useState, useRef } from "react"
import DateRangePicker from "./DateRangePicker"
import DropdownPortal from "./DropdownPortal"

const AIRPORTS = [
  { code: "AMS", city: "Amsterdam", label: "Amsterdam Schiphol" },
  { code: "RTM", city: "Rotterdam", label: "Rotterdam The Hague" },
  { code: "EIN", city: "Eindhoven", label: "Eindhoven Airport" },
  { code: "MST", city: "Maastricht", label: "Maastricht Aachen Airport" },
  { code: "GRQ", city: "Groningen", label: "Groningen Airport Eelde" },
  { code: "BCN", city: "Barcelona", label: "Barcelona El Prat" },
  { code: "LHR", city: "Londen", label: "London Heathrow" },
  { code: "CDG", city: "Parijs", label: "Paris Charles de Gaulle" },
  { code: "FCO", city: "Rome", label: "Rome Fiumicino" },
  { code: "MAD", city: "Madrid", label: "Madrid Barajas" },
  { code: "DXB", city: "Dubai", label: "Dubai International" },
  { code: "JFK", city: "New York", label: "New York JFK" },
  { code: "NRT", city: "Tokyo", label: "Tokyo Narita" },
  { code: "PMI", city: "Mallorca", label: "Palma de Mallorca" },
  { code: "IBZ", city: "Ibiza", label: "Ibiza Airport" },
  { code: "TFS", city: "Tenerife", label: "Tenerife South" },
  { code: "ATH", city: "Athene", label: "Athens International" },
]

function buildSkyscannerUrl(origin: string, destination: string, date: string, returnDate: string, adults: number) {
  const d = date.replace(/-/g, "")
  const r = returnDate ? returnDate.replace(/-/g, "") : ""
  const base = `https://www.skyscanner.nl/transport/vluchten/${origin.toLowerCase()}/${destination.toLowerCase()}/`
  const params = new URLSearchParams({
    adults: String(adults),
    adultsv2: String(adults),
    cabinclass: "economy",
    children: "0",
    infants: "0",
    rtn: returnDate ? "1" : "0",
    utm_source: "vluchten_ai",
    utm_medium: "affiliate",
    utm_campaign: "comparison",
  })
  return `${base}${d}/${r}/?${params.toString()}`
}

function fmt(d: Date) {
  return d.toISOString().split("T")[0]
}

function formatDisplay(dateStr: string) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short" })
}

interface SearchWidgetProps {
  defaultOrigin?: string
  defaultDestination?: string
  defaultDestinationCode?: string
  compact?: boolean
}

export default function SearchWidget({
  defaultOrigin = "Amsterdam Schiphol",
  defaultDestination = "",
  defaultDestinationCode = "",
  compact = false,
}: SearchWidgetProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const inTwoWeeks = new Date(today)
  inTwoWeeks.setDate(today.getDate() + 14)
  const inThreeWeeks = new Date(today)
  inThreeWeeks.setDate(today.getDate() + 21)

  const [tripType, setTripType] = useState<"retour" | "enkel">("retour")
  const [origin, setOrigin] = useState(defaultOrigin)
  const [destination, setDestination] = useState(defaultDestination)
  const [departDate, setDepartDate] = useState(fmt(inTwoWeeks))
  const [returnDate, setReturnDate] = useState(fmt(inThreeWeeks))
  const [adults, setAdults] = useState(1)
  const [directOnly, setDirectOnly] = useState(false)
  const [originCode, setOriginCode] = useState("AMS")
  const [destCode, setDestCode] = useState(defaultDestinationCode)

  const [originSuggestions, setOriginSuggestions] = useState<typeof AIRPORTS>([])
  const [destSuggestions, setDestSuggestions] = useState<typeof AIRPORTS>([])
  const [showCalendar, setShowCalendar] = useState(false)
  const calendarAnchorRef = useRef<HTMLButtonElement>(null)
  const originInputRef = useRef<HTMLDivElement>(null)
  const destInputRef = useRef<HTMLDivElement>(null)

  function filterAirports(query: string) {
    const q = query.toLowerCase()
    return AIRPORTS.filter(
      (a) =>
        a.city.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.label.toLowerCase().includes(q)
    ).slice(0, 6)
  }

  function swap() {
    setOrigin(destination); setDestination(origin)
    setOriginCode(destCode); setDestCode(originCode)
  }

  function handleSearch() {
    if (!originCode || !destCode) {
      alert("Vul een vertrek- en aankomstluchthaven in.")
      return
    }
    const url = buildSkyscannerUrl(originCode, destCode, departDate, tripType === "retour" ? returnDate : "", adults)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Human-readable date range label for the button
  const dateLabel = (() => {
    const dep = formatDisplay(departDate)
    const ret = tripType === "retour" ? formatDisplay(returnDate) : null
    if (!dep) return "Kies datum"
    if (ret) return `${dep} — ${ret}`
    return dep
  })()

  return (
    <div className={`bg-white rounded-2xl shadow-xl ${compact ? "p-5" : "p-7"}`}>
      {/* Trip type tabs */}
      <div className="flex gap-1 mb-5 bg-slate-100 p-1 rounded-xl w-fit">
        {(["retour", "enkel"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTripType(t); if (t === "enkel") setReturnDate("") }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              tripType === t ? "bg-white text-violet-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t === "retour" ? "Retour" : "Enkele reis"}
          </button>
        ))}
      </div>

      {/* Form row */}
      <div className="flex flex-wrap gap-2 items-end">

        {/* Origin */}
        <div className="flex-1 min-w-44">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Van</label>
          <div ref={originInputRef} className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🛫</span>
            <input
              value={origin}
              onChange={(e) => { setOrigin(e.target.value); setOriginSuggestions(filterAirports(e.target.value)) }}
              onFocus={() => setOriginSuggestions(filterAirports(origin))}
              onBlur={() => setTimeout(() => setOriginSuggestions([]), 150)}
              placeholder="Stad of luchthaven"
              className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            {originSuggestions.length > 0 && (
              <DropdownPortal anchorRef={originInputRef}>
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  {originSuggestions.map((a) => (
                    <button key={a.code} className="w-full px-4 py-3 text-left text-sm hover:bg-violet-50 flex justify-between items-center"
                      onMouseDown={() => { setOrigin(a.label); setOriginCode(a.code); setOriginSuggestions([]) }}>
                      <span>{a.label}</span>
                      <span className="font-bold text-violet-600 text-xs">{a.code}</span>
                    </button>
                  ))}
                </div>
              </DropdownPortal>
            )}
          </div>
        </div>

        {/* Swap */}
        <button onClick={swap}
          className="w-10 h-10 mb-0.5 rounded-full bg-violet-100 text-violet-700 text-lg flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all shrink-0"
          title="Wissel">⇄</button>

        {/* Destination */}
        <div className="flex-1 min-w-44">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Naar</label>
          <div ref={destInputRef} className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🛬</span>
            <input
              value={destination}
              onChange={(e) => { setDestination(e.target.value); setDestSuggestions(filterAirports(e.target.value)) }}
              onFocus={() => setDestSuggestions(filterAirports(destination))}
              onBlur={() => setTimeout(() => setDestSuggestions([]), 150)}
              placeholder="Bestemming"
              className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            {destSuggestions.length > 0 && (
              <DropdownPortal anchorRef={destInputRef}>
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  {destSuggestions.map((a) => (
                    <button key={a.code} className="w-full px-4 py-3 text-left text-sm hover:bg-violet-50 flex justify-between items-center"
                      onMouseDown={() => { setDestination(a.label); setDestCode(a.code); setDestSuggestions([]) }}>
                      <span>{a.label}</span>
                      <span className="font-bold text-violet-600 text-xs">{a.code}</span>
                    </button>
                  ))}
                </div>
              </DropdownPortal>
            )}
          </div>
        </div>

        {/* Date trigger — single button that opens the calendar */}
        <div className="relative min-w-52">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            {tripType === "retour" ? "Reisdata" : "Vertrekdatum"}
          </label>
          <button
            ref={calendarAnchorRef}
            onClick={() => setShowCalendar((v) => !v)}
            className={`w-full flex items-center gap-2 pl-3 pr-4 py-3 border rounded-xl text-sm text-left transition-all ${
              showCalendar
                ? "border-violet-500 ring-2 ring-violet-500 ring-offset-0"
                : "border-slate-200 hover:border-violet-300"
            }`}
          >
            <span className="text-base shrink-0">📅</span>
            <span className="font-medium text-slate-700 truncate">{dateLabel}</span>
          </button>

          {showCalendar && (
            <DateRangePicker
              anchorRef={calendarAnchorRef}
              departDate={departDate}
              returnDate={returnDate}
              tripType={tripType}
              onChangeDates={(dep, ret) => { setDepartDate(dep); setReturnDate(ret) }}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        {/* Passengers */}
        <div className="min-w-36">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Reizigers</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">👤</span>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white appearance-none"
            >
              {[1,2,3,4,5,6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "volwassene" : "volwassenen"}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
        <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
          <input type="checkbox" checked={directOnly} onChange={(e) => setDirectOnly(e.target.checked)}
            className="accent-violet-600 w-4 h-4" />
          Alleen directe vluchten
        </label>

        <button
          onClick={handleSearch}
          className="flex items-center gap-2 px-8 py-3.5 bg-violet-600 text-white font-bold text-base rounded-xl hover:bg-violet-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <span>🔍</span> Vluchten zoeken
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        We vergelijken Skyscanner, Kiwi.com en meer — je wordt doorgestuurd naar de aanbieder.
      </p>
    </div>
  )
}
