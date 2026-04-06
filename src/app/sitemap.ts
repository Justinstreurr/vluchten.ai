import { MetadataRoute } from "next"
import { destinations } from "@/data/destinations"
import { months } from "@/data/months"
import { airlines } from "@/data/airlines"
import { tips } from "@/data/tips"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vluchten.ai"
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/goedkope-vluchten`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/airlines`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/tips`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ]

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${base}/vluchten-naar/${d.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.85,
  }))

  const monthRoutes: MetadataRoute.Sitemap = months.map((m) => ({
    url: `${base}/goedkope-vluchten/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  const airlineRoutes: MetadataRoute.Sitemap = airlines.map((a) => ({
    url: `${base}/airlines/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
  }))

  const tipRoutes: MetadataRoute.Sitemap = tips.map((t) => ({
    url: `${base}/tips/${t.slug}`,
    lastModified: new Date(t.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...monthRoutes,
    ...airlineRoutes,
    ...tipRoutes,
  ]
}
