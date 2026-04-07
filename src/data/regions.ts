import type { Region } from "./destinations"

export interface RegionData {
  slug: Region
  name: string
  description: string
  photo: string
}

export const regions: RegionData[] = [
  {
    slug: "europa",
    name: "Europa",
    description: "Steden, stranden en cultuur op korte vliegafstand. Van Barcelona tot Athene.",
    photo: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=90",
  },
  {
    slug: "canarische-eilanden",
    name: "Canarische Eilanden",
    description: "Jaarrond zon en temperaturen rond de 22°C. Tenerife, Gran Canaria, Lanzarote.",
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90",
  },
  {
    slug: "midden-oosten",
    name: "Midden-Oosten",
    description: "Dubai, Abu Dhabi en Doha — luxe, architectuur en perfecte aansluitingen wereldwijd.",
    photo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=90",
  },
  {
    slug: "azie",
    name: "Azië",
    description: "Van Tokyo tot Bangkok — cultuur, eten en avontuur op zijn best.",
    photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=90",
  },
  {
    slug: "noord-amerika",
    name: "Noord-Amerika",
    description: "New York, Miami, Los Angeles — de klassiekers van de Amerikaanse droom.",
    photo: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=90",
  },
]

export function getRegion(slug: string): RegionData | undefined {
  return regions.find((r) => r.slug === slug)
}
