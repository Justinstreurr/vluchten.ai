import Link from "next/link"
import Image from "next/image"
import { Destination } from "@/data/destinations"

interface DestinationCardProps {
  destination: Destination
  showPrice?: boolean
}

export default function DestinationCard({ destination: d, showPrice = true }: DestinationCardProps) {
  const trendDown = d.priceTrend < 0
  const trendAbs = Math.abs(d.priceTrend)

  return (
    <Link
      href={`/vluchten-naar/${d.slug}`}
      className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
    >
      {/* Photo */}
      <div className="relative h-40 overflow-hidden bg-slate-200">
        <Image
          src={d.photo}
          alt={`Vluchten naar ${d.city}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {d.deal && (
            <span className="text-xs font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full shadow">
              Deal
            </span>
          )}
          {d.trending && (
            <span className="text-xs font-bold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full shadow">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Price trend badge top-right */}
        {d.priceTrend !== 0 && (
          <span className={`absolute top-2.5 right-2.5 text-xs font-bold px-2 py-0.5 rounded-full shadow ${
            trendDown
              ? "bg-green-500 text-white"
              : "bg-orange-100 text-orange-700"
          }`}>
            {trendDown ? `↓ ${trendAbs}%` : `↑ ${trendAbs}%`}
          </span>
        )}

        {/* City name bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5">
          <div className="text-white font-bold text-base drop-shadow">{d.city}</div>
          <div className="text-white/75 text-xs">{d.country}</div>
        </div>
      </div>

      {/* Info row */}
      <div className="px-3.5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span>✈</span>
          <span>
            {d.flightTimeHours}u{d.flightTimeMin > 0 ? `${d.flightTimeMin}m` : ""}
          </span>
        </div>

        {showPrice && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400">v.a. </span>
            <span className="font-extrabold text-violet-700 text-base">€{d.avgPrice}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
