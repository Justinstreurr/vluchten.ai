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
    publisher: {
      "@type": "Organization",
      name: "Vluchten.ai",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-violet-600">Home</Link>
          <span>/</span>
          <Link href="/tips" className="hover:text-violet-600">Tips</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{tip.title}</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-violet-300 text-sm font-semibold uppercase tracking-wide mb-3">{tip.category}</div>
          <div className="text-5xl mb-4">{tip.emoji}</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">{tip.title}</h1>
          <p className="text-slate-300 text-lg">{tip.description}</p>
          <div className="flex items-center gap-4 mt-5 text-sm text-slate-400">
            <span>📅 {new Date(tip.date).toLocaleDateString("nl-NL", { dateStyle: "long" })}</span>
            <span>·</span>
            <span>⏱ {tip.readTime} min lezen</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Article content */}
        <div
          className="prose prose-slate max-w-none bg-white rounded-2xl border border-slate-200 p-8"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(tip.content) }}
        />

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Klaar om te vliegen?</h2>
          <p className="text-violet-200 mb-6">Vergelijk nu vluchten en bespaar direct.</p>
          <Link
            href="/goedkope-vluchten"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors"
          >
            🔍 Zoek goedkope vluchten
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
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-violet-300 transition-all group"
              >
                <div className="text-2xl mb-2">{t.emoji}</div>
                <div className="font-semibold text-slate-900 text-sm group-hover:text-violet-700 transition-colors leading-snug">
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

// Simple markdown-to-HTML converter (no external deps)
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
