"use client"

export default function ScrollTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center px-8 py-4 bg-[#05428C] text-white font-semibold text-base rounded hover:bg-[#03306B] transition-colors shadow-md"
    >
      Vluchten zoeken
    </button>
  )
}
