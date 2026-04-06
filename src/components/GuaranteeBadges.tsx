const badges = [
  {
    icon: "🔍",
    title: "500+ maatschappijen",
    desc: "We vergelijken Skyscanner, Kiwi.com, Booking.com en honderden anderen in één klik.",
  },
  {
    icon: "💸",
    title: "Altijd de laagste prijs",
    desc: "We tonen de scherpste tarieven. Geen bijkomende vergelijkingskosten van ons.",
  },
  {
    icon: "🔒",
    title: "Veilig boeken",
    desc: "Je boekt rechtstreeks bij de luchtvaartmaatschappij of erkend platform. 100% veilig.",
  },
  {
    icon: "⚡",
    title: "Resultaten in seconden",
    desc: "Onze AI scant duizenden routes en combinaties razendsnel voor jou.",
  },
]

export default function GuaranteeBadges() {
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b) => (
            <div key={b.title} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-2xl shrink-0">
                {b.icon}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{b.title}</div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
