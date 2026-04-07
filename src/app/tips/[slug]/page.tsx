import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { tips, getTip } from "@/data/tips"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tips.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tip = getTip(slug)
  if (!tip) return {}
  return {
    title: tip.title,
    description: tip.description,
    keywords: [tip.category, "vliegen", "goedkoop vliegen", tip.title.toLowerCase()],
  }
}

export default async function TipPage({ params }: Props) {
  const { slug } = await params
  const tip = getTip(slug)
  if (!tip) notFound()

  const otherTips = tips.filter((t) => t.slug !== slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tip.title,
    description: tip.description,
    datePublished: tip.date,
    publisher: { "@type": "Organization", name: "Vluchten.ai" },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span>/</span>
          <Link href="/tips" className="hover:text-slate-700">Tips</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{tip.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#05428C] pt-8 pb-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">{tip.category}</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">{tip.title}</h1>
          <p className="text-white/60 text-sm">{tip.description}</p>
          <div className="flex items-center gap-4 mt-4 text-xs text-white/40">
            <span>{new Date(tip.date).toLocaleDateString("nl-NL", { dateStyle: "long" })}</span>
            <span>&middot;</span>
            <span>{tip.readTime} min lezen</span>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Article */}
        <div
          className="prose prose-slate max-w-none bg-white rounded-lg border border-slate-200 p-8"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(tip.content) }}
        />

        {/* CTA */}
        <div className="mt-8 bg-slate-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Klaar om te vliegen?</h2>
          <p className="text-slate-400 text-sm mb-6">Vergelijk nu vluchten en bespaar direct.</p>
          <Link
            href="/goedkope-vluchten"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#05428C] text-white font-semibold rounded hover:bg-[#03306B] transition-colors"
          >
            Zoek goedkope vluchten
          </Link>
        </div>

        {/* Related tips */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-5">Meer tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherTips.map((t) => (
              <Link
                key={t.slug}
                href={`/tips/${t.slug}`}
                className="group bg-white rounded-lg border border-slate-200 p-5 hover:border-slate-300 transition-all"
              >
                <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">{t.category}</div>
                <div className="font-semibold text-slate-900 text-sm group-hover:text-slate-700 transition-colors leading-snug">
                  {t.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function renderMarkdown(md: string): string {
  return md
    .trim()
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|o|l])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[h|u|l])/g, '$1')
    .replace(/(<\/[h|u|l][^>]*>)<\/p>/g, '$1')
}
