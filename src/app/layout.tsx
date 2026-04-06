import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://vluchten.ai"),
  title: {
    default: "Vluchten.ai — Vergelijk goedkope vluchten",
    template: "%s | Vluchten.ai",
  },
  description:
    "Vind de goedkoopste vluchten via vluchten.ai. Vergelijk honderden luchtvaartmaatschappijen en boek direct via Skyscanner, Kiwi.com of Booking.com.",
  keywords: ["goedkope vluchten", "vliegtickets vergelijken", "vluchten zoeken", "goedkoop vliegen"],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Vluchten.ai",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
