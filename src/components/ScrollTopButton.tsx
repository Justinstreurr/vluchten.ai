"use client"

export default function ScrollTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-bold text-lg rounded-xl hover:bg-violet-50 transition-colors shadow-xl"
    >
      <span>🔍</span> Zoek vluchten
    </button>
  )
}
