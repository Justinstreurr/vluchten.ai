export default function TrustStrip() {
  return (
    <div className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Vergelijkt via</span>

          {/* Partner logos as styled text (no external images needed) */}
          {[
            { name: "Skyscanner", color: "text-sky-400" },
            { name: "Kiwi.com", color: "text-emerald-400" },
            { name: "Booking.com", color: "text-blue-400" },
          ].map((p) => (
            <span key={p.name} className={`font-extrabold text-sm ${p.color} opacity-80`}>
              {p.name}
            </span>
          ))}

          <div className="w-px h-4 bg-slate-700 hidden sm:block" />

          {/* Trustpilot */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs font-semibold">Trustpilot</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-emerald-400 text-sm">★</span>
              ))}
            </div>
            <span className="text-slate-400 text-xs">4,7 / 5</span>
          </div>

          <div className="w-px h-4 bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> Gratis vergelijken</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> Geen verborgen kosten</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> Direct bij de aanbieder</span>
          </div>
        </div>
      </div>
    </div>
  )
}
