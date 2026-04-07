import Image from "next/image"

export default function TrustStrip() {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest shrink-0">Vergelijkt via</span>

        <Image src="/logo-skyscanner.png" alt="Skyscanner"  width={120} height={24} className="h-5 w-auto object-contain" />
        <Image src="/logo-booking.png"   alt="Booking.com" width={120} height={24} className="h-5 w-auto object-contain" />
        <Image src="/logo-kiwi.png"      alt="Kiwi.com"    width={120} height={24} className="h-5 w-auto object-contain" />

        <span className="w-px h-4 bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-1 text-xs text-slate-500">
          <svg className="w-3.5 h-3.5 text-[#00b67a]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="font-semibold text-slate-700">4,7/5</span>
          <span className="text-slate-400">Trustpilot</span>
        </div>

        <span className="w-px h-4 bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            100% gratis
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Geen verborgen kosten
          </span>
          <span className="flex items-center gap-1 hidden md:flex">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Direct bij de aanbieder
          </span>
        </div>
      </div>
    </div>
  )
}
