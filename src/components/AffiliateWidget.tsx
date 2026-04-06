interface AffiliateWidgetProps {
  destinationCity: string
  destinationIata: string
  originIata?: string
  avgPrice?: number
}

const AFFILIATE_MARKER = "YOUR_TRAVELPAYOUTS_MARKER" // Replace with actual marker

function skyscannerUrl(origin: string, dest: string) {
  return `https://www.skyscanner.nl/transport/vluchten/${origin.toLowerCase()}/${dest.toLowerCase()}/?utm_source=vluchten_ai&utm_medium=affiliate&utm_campaign=destination`
}

function kiwiUrl(origin: string, dest: string) {
  return `https://www.kiwi.com/nl/search/${origin}/${dest}/anytime/anytime?utm_source=vluchten_ai&utm_medium=affiliate`
}

function bookingUrl(dest: string) {
  return `https://www.booking.com/flights/index.html?type=ONEWAY&from=AMS&to=${dest}&utm_source=vluchten_ai&utm_medium=affiliate`
}

function travelpayoutsUrl(origin: string, dest: string) {
  return `https://tp.media/r?marker=${AFFILIATE_MARKER}&p=4114&u=${encodeURIComponent(skyscannerUrl(origin, dest))}`
}

export default function AffiliateWidget({
  destinationCity,
  destinationIata,
  originIata = "AMS",
  avgPrice,
}: AffiliateWidgetProps) {
  const partners = [
    {
      name: "Skyscanner",
      logo: "🔵",
      tagline: "Vergelijk honderden maatschappijen",
      badge: "Meest populair",
      badgeColor: "bg-green-100 text-green-700",
      url: skyscannerUrl(originIata, destinationIata),
      priceNote: avgPrice ? `v.a. €${avgPrice}` : "Bekijk prijzen",
      cta: "Bekijk vluchten →",
      highlight: true,
    },
    {
      name: "Kiwi.com",
      logo: "🟢",
      tagline: "Slimme combinaties, lage prijzen",
      badge: "Beste deals",
      badgeColor: "bg-blue-100 text-blue-700",
      url: kiwiUrl(originIata, destinationIata),
      priceNote: avgPrice ? `v.a. €${Math.round(avgPrice * 0.95)}` : "Bekijk prijzen",
      cta: "Bekijk vluchten →",
      highlight: false,
    },
    {
      name: "Booking.com",
      logo: "🔷",
      tagline: "Boek vluchten + hotel tegelijk",
      badge: "Pakketdeals",
      badgeColor: "bg-purple-100 text-purple-700",
      url: bookingUrl(destinationIata),
      priceNote: "Combineer en bespaar",
      cta: "Bekijk vluchten →",
      highlight: false,
    },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h2 className="font-bold text-lg text-slate-900">
          Vergelijk vluchten naar {destinationCity}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Klik op een aanbieder om de actuele prijzen te zien en te boeken.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {partners.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`flex items-center justify-between px-6 py-5 hover:bg-violet-50 transition-colors group ${
              p.highlight ? "bg-violet-50/50" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                {p.logo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{p.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{p.tagline}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="font-extrabold text-violet-700 text-lg">{p.priceNote}</div>
                <div className="text-xs text-slate-400">per persoon</div>
              </div>
              <span className="text-violet-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                {p.cta}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-xs text-slate-400">
          * Vluchten.ai ontvangt mogelijk een commissie bij boeking via bovenstaande links. Dit heeft geen invloed op de prijs die je betaalt.
        </p>
      </div>
    </div>
  )
}
