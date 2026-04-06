import Link from "next/link"

const NAV = [
  { href: "/goedkope-vluchten", label: "Vluchten" },
  { href: "/goedkope-vluchten/mei", label: "Deals" },
  { href: "/airlines", label: "Airlines" },
  { href: "/tips", label: "Tips & Gidsen" },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-15 flex items-center gap-6" style={{ height: "60px" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-[#05203c] shrink-0">
          <span className="text-violet-600">✈</span>
          <span>
            vluchten<span className="text-violet-600">.ai</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-violet-700 hover:bg-violet-50 transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3 shrink-0">
          {/* Trustpilot mini badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 border border-slate-200 rounded-lg px-3 py-1.5">
            <span className="flex gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => <span key={i} className="text-xs">★</span>)}
            </span>
            <span className="font-semibold text-slate-600">4,7</span>
            <span>· Trustpilot</span>
          </div>

          <Link
            href="/goedkope-vluchten"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm shadow-violet-200"
          >
            <span>🔍</span>
            <span className="hidden sm:inline">Vluchten zoeken</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
