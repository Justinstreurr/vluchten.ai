"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface Props {
  anchorRef: React.RefObject<HTMLElement | null>
  children: React.ReactNode
}

export default function DropdownPortal({ anchorRef, children }: Props) {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !anchorRef.current) return

    function updatePos() {
      const rect = anchorRef.current!.getBoundingClientRect()
      setPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
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

  if (!mounted) return null

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body
  )
}
