import Link from "next/link"
import Image from "next/image"

const NAV = [
  {
    href: "/goedkope-vluchten",
    label: "Vluchten",
    icon: <Image src="/icon-plane.png" alt="" width={16} height={16} className="w-4 h-4 object-contain" />,
  },
  {
    href: "/goedkope-vluchten/mei",
    label: "Deals",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    href: "/airlines",
    label: "Airlines",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    href: "/tips",
    label: "Tips",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 shrink-0">
          <Image src="/icon-plane.png" alt="" width={28} height={28} className="w-7 h-7 object-contain" style={{filter:"brightness(0) saturate(100%) invert(32%) sepia(90%) saturate(1200%) hue-rotate(200deg) brightness(95%) contrast(100%)"}} />
          <span>vluchten<span className="text-slate-900">.ai</span></span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400">
            <span className="font-medium">Trustpilot</span>
            <span className="font-semibold text-slate-600">4,7&thinsp;/&thinsp;5</span>
          </div>

          <Link href="/goedkope-vluchten"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#05428C] text-white text-sm font-semibold hover:bg-[#03306B] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="hidden sm:inline">Vluchten zoeken</span>
            <span className="sm:hidden">Zoeken</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
