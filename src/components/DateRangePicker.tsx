"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

const DAYS = ["ma", "di", "wo", "do", "vr", "za", "zo"]
const MONTHS_NL = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
]

function dayOfWeek(date: Date) {
  return (date.getDay() + 6) % 7
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function toDateStr(d: Date) {
  return d.toISOString().split("T")[0]
}

interface Props {
  anchorRef: React.RefObject<HTMLButtonElement | null>
  departDate: string
  returnDate: string
  tripType: "retour" | "enkel"
  onChangeDates: (depart: string, ret: string) => void
  onClose: () => void
}

export default function DateRangePicker({ anchorRef, departDate, returnDate, tripType, onChangeDates, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(() => {
    const d = departDate ? new Date(departDate) : new Date()
    return d.getFullYear()
  })
  const [viewMonth, setViewMonth] = useState(() => {
    const d = departDate ? new Date(departDate) : new Date()
    return d.getMonth()
  })

  const [selecting, setSelecting] = useState<"depart" | "return">(
    departDate && !returnDate && tripType === "retour" ? "return" : "depart"
  )
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  const depart = departDate ? new Date(departDate) : null
  const ret = returnDate ? new Date(returnDate) : null

  // Mount + position
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !anchorRef.current) return

    function updatePos() {
      const rect = anchorRef.current!.getBoundingClientRect()
      setPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      })
    }

    updatePos()
    window.addEventListener("resize", updatePos)
    window.addEventListener("scroll", updatePos, true)
    return () => {
      window.removeEventListener("resize", updatePos)
      window.removeEventListener("scroll", updatePos, true)
    }
  }, [mounted, anchorRef])

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as Node
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        anchorRef.current && !anchorRef.current.contains(target)
      ) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose, anchorRef])

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const month2 = viewMonth === 11 ? 0 : viewMonth + 1
  const year2 = viewMonth === 11 ? viewYear + 1 : viewYear

  function handleDayClick(date: Date) {
    if (date < today) return

    if (tripType === "enkel") {
      onChangeDates(toDateStr(date), "")
      onClose()
      return
    }

    if (selecting === "depart" || !depart) {
      onChangeDates(toDateStr(date), "")
      setSelecting("return")
    } else {
      if (date < depart) {
        onChangeDates(toDateStr(date), "")
        setSelecting("return")
      } else {
        onChangeDates(toDateStr(depart), toDateStr(date))
        setSelecting("depart")
        onClose()
      }
    }
  }

  function renderMonth(year: number, month: number) {
    const totalDays = daysInMonth(year, month)
    const firstDow = dayOfWeek(new Date(year, month, 1))

    const cells: (Date | null)[] = [
      ...Array(firstDow).fill(null),
      ...Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1)),
    ]
    while (cells.length % 7 !== 0) cells.push(null)

    const effectiveEnd =
      hoverDate && depart && selecting === "return" && hoverDate > depart
        ? hoverDate
        : ret

    return (
      <div className="flex-1 min-w-0">
        <div className="text-center font-bold text-slate-800 text-[15px] mb-4 capitalize">
          {MONTHS_NL[month]} {year}
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((date, i) => {
            if (!date) return <div key={i} />

            const isPast = date < today
            const isStart = !!(depart && isSameDay(date, depart))
            const isEnd = !!(effectiveEnd && isSameDay(date, effectiveEnd))
            const inRange = !!(depart && effectiveEnd && date > depart && date < effectiveEnd)
            const isToday = isSameDay(date, today)
            const isHover = !!(hoverDate && isSameDay(date, hoverDate))

            const showRangeLeft = inRange || isEnd
            const showRangeRight = inRange || isStart

            return (
              <div
                key={i}
                className="relative h-10 flex items-center justify-center"
                onClick={() => !isPast && handleDayClick(date)}
                onMouseEnter={() => !isPast && setHoverDate(date)}
                onMouseLeave={() => setHoverDate(null)}
              >
                {/* Range background: left half */}
                {showRangeLeft && (
                  <div className="absolute left-0 top-1 bottom-1 w-1/2 bg-blue-100" />
                )}
                {/* Range background: right half */}
                {showRangeRight && (
                  <div className="absolute right-0 top-1 bottom-1 w-1/2 bg-blue-100" />
                )}

                {/* Day circle */}
                <span
                  className={`
                    relative z-10 w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors select-none
                    ${isPast ? "text-slate-300 cursor-not-allowed" : "cursor-pointer"}
                    ${isStart || isEnd
                      ? "bg-[#05428C] text-white font-bold shadow-sm"
                      : isToday
                      ? "border-2 border-[#03306B] text-[#03306B] font-semibold"
                      : isHover && !isPast
                      ? "bg-blue-100 text-[#03306B]"
                      : inRange
                      ? "text-slate-700"
                      : "text-slate-700 hover:bg-slate-100"
                    }
                  `}
                >
                  {date.getDate()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const nights = depart && ret
    ? Math.round((ret.getTime() - depart.getTime()) / 86400000)
    : null

  if (!mounted) return null

  const panel = (
    <div
      ref={panelRef}
      style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999 }}
      className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 w-max"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors text-xl leading-none"
        >
          ‹
        </button>

        <span className="text-sm font-semibold text-slate-500">
          {tripType === "retour"
            ? (selecting === "depart" ? "Kies je vertrekdatum" : "Kies je terugvlucht")
            : "Kies je vertrekdatum"
          }
        </span>

        <button
          onClick={nextMonth}
          className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors text-xl leading-none"
        >
          ›
        </button>
      </div>

      {/* Two months */}
      <div className="flex gap-8" style={{ minWidth: 620 }}>
        {renderMonth(viewYear, viewMonth)}
        <div className="w-px bg-slate-100 self-stretch shrink-0" />
        {renderMonth(year2, month2)}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-6">
        <div className="text-sm text-slate-500">
          {depart && ret ? (
            <span>
              <span className="font-semibold text-slate-800">
                {depart.toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}
              </span>
              {" — "}
              <span className="font-semibold text-slate-800">
                {ret.toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}
              </span>
              {nights && nights > 0 && (
                <span className="ml-2 text-[#05428C] font-semibold">{nights} nacht{nights !== 1 ? "en" : ""}</span>
              )}
            </span>
          ) : depart ? (
            <span>
              Vertrek:{" "}
              <span className="font-semibold text-slate-800">
                {depart.toLocaleDateString("nl-NL", { day: "numeric", month: "long" })}
              </span>
              {tripType === "retour" && <span className="text-slate-400"> — kies terugvlucht</span>}
            </span>
          ) : (
            <span className="text-slate-400">Selecteer je reisdata</span>
          )}
        </div>

        <button
          onClick={onClose}
          className="px-5 py-2 bg-[#05428C] text-white text-sm font-semibold rounded-xl hover:bg-[#03306B] transition-colors shrink-0"
        >
          Toepassen
        </button>
      </div>
    </div>
  )

  return createPortal(panel, document.body)
}
