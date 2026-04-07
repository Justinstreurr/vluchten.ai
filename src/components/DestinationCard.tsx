import Link from "next/link"
import Image from "next/image"
import { Destination } from "@/data/destinations"

interface Props {
  destination: Destination
}

export default function DestinationCard({ destination: d }: Props) {

  return (
    <Link href={`/vluchten-naar/${d.slug}`}
      className="group block rounded-lg overflow-hidden bg-white border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200">

      {/* Photo */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <Image
          src={d.photo}
          alt={`Vluchten naar ${d.city}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {d.deal && (
            <span className="text-[10px] font-semibold bg-rose-500 text-white px-2 py-0.5 rounded tracking-wide">
              Deal
            </span>
          )}
          {d.trending && (
            <span className="text-[10px] font-semibold bg-[#F58A07] text-white px-2 py-0.5 rounded tracking-wide">
              Populair
            </span>
          )}
        </div>

        {/* Deal badge */}
        {d.deal && !d.trending && (
          <span className="absolute top-3 right-3 text-[10px] font-semibold bg-[#F58A07] text-white px-2 py-0.5 rounded tracking-wide">
            Deal
          </span>
        )}

        {/* City over photo */}
        <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3">
          <div className="text-white font-semibold text-base leading-tight">{d.city}</div>
          <div className="text-white/70 text-xs">{d.country}</div>
        </div>
      </div>

      {/* Footer row */}
      <div className="px-3.5 py-3 flex items-center justify-between bg-white">
        <div className="text-xs text-slate-400">
          {d.flightTimeHours}u{d.flightTimeMin > 0 ? `\u202F${d.flightTimeMin}m` : ""} vlucht
        </div>
        <div>
          <span className="text-[10px] text-slate-400">~</span>
          <span className="font-bold text-slate-900">&euro;{d.avgPrice}</span>
          <span className="text-[10px] text-slate-400">*</span>
        </div>
      </div>
    </Link>
  )
}
