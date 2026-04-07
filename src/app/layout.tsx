import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

export const metadata: Metadata = {
  metadataBase: new URL("https://vluchten.ai"),
  title: {
    default: "Vluchten.ai — Slim vliegen begint hier",
    template: "%s | Vluchten.ai — Slim vliegen begint hier",
  },
  description:
    "Ontdek wanneer je moet boeken, vanwaar je het goedkoopst vertrekt en welke aanbieder nu de laagste prijs heeft. Nederlandstalige reisgids voor slimme vliegers. 100% gratis.",
  keywords: ["goedkope vluchten", "wanneer boeken vlucht", "vliegtickets vergelijken", "goedkoop vliegen tips"],
  openGraph: { type: "website", locale: "nl_NL", siteName: "Vluchten.ai" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`h-full antialiased ${geist.variable}`}>
      <body className="min-h-screen flex flex-col bg-white font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
