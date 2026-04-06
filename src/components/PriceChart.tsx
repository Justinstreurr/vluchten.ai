"use client"

const MONTHS_SHORT = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]

function generatePriceData(avgPrice: number): number[] {
  const multipliers = [0.8, 0.85, 0.9, 1.0, 1.1, 1.2, 1.4, 1.5, 0.95, 0.9, 0.85, 1.2]
  return multipliers.map((m) => Math.round(avgPrice * m))
}

interface PriceChartProps {
  avgPrice: number
  city: string
}

export default function PriceChart({ avgPrice, city }: PriceChartProps) {
  const prices = generatePriceData(avgPrice)
  const max = Math.max(...prices)
  const min = Math.min(...prices)
  const currentMonth = new Date().getMonth()

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="font-bold text-slate-900 mb-1">Gemiddelde vliegprijzen naar {city}</h3>
      <p className="text-sm text-slate-500 mb-6">Indicatieve prijzen per persoon (retour vanuit Amsterdam)</p>

      <div className="flex items-end gap-1.5 h-40">
        {prices.map((price, i) => {
          const heightPct = ((price - min) / (max - min)) * 80 + 20
          const isCurrent = i === currentMonth
          const isCheap = price === min

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                className="relative w-full rounded-t-lg transition-all"
                style={{
                  height: `${heightPct}%`,
                  background: isCheap
                    ? "linear-gradient(to top, #16a34a, #4ade80)"
                    : isCurrent
                    ? "linear-gradient(to top, #7c3aed, #a78bfa)"
                    : "linear-gradient(to top, #e2e8f0, #f1f5f9)",
                }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  €{price}
                </div>
              </div>
              <span className={`text-xs ${isCurrent ? "font-bold text-violet-600" : "text-slate-400"}`}>
                {MONTHS_SHORT[i]}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> Goedkoopste maand
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-violet-600 inline-block" /> Huidige maand
        </span>
      </div>
    </div>
  )
}
