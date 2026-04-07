const badges = [
  {
    title: "Via Skyscanner, Kiwi.com & Booking.com",
    desc: "Wij vergelijken de drie grootste vluchtenzoekers zodat jij de beste optie kiest.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: "Gratis, zonder verborgen kosten",
    desc: "Vluchten.ai is gratis te gebruiken. Wij verdienen een commissie wanneer je doorklikt en boekt.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Je boekt direct bij de aanbieder",
    desc: "Geen tussenpersoon — je boekt rechtstreeks op Skyscanner, Kiwi.com of Booking.com.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Nederlandstalig advies",
    desc: "Onze reisgidsen en tips zijn volledig in het Nederlands, gericht op reizigers vanuit Nederland.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

export default function GuaranteeBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {badges.map((b) => (
        <div key={b.title} className="flex flex-col items-start gap-3">
          <div className="text-[#05428C]">{b.icon}</div>
          <div>
            <div className="font-semibold text-slate-900 text-sm leading-snug">{b.title}</div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
