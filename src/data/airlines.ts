export interface Airline {
  slug: string
  name: string
  iata: string
  emoji: string
  country: string
  type: "fullservice" | "lowcost" | "charter"
  description: string
  baggage: {
    handbagage: string
    ruimbagage: string
    ruimbagage23kg: string
  }
  hubs: string[]
  destinations: number
}

export const airlines: Airline[] = [
  {
    slug: "klm",
    name: "KLM Royal Dutch Airlines",
    iata: "KL",
    emoji: "✈️",
    country: "Nederland",
    type: "fullservice",
    description: "KLM is de nationale luchtvaartmaatschappij van Nederland en vliegt vanuit Amsterdam Schiphol naar meer dan 160 bestemmingen wereldwijd.",
    baggage: {
      handbagage: "1 stuk, max 12 kg, 55x35x25 cm",
      ruimbagage: "Inbegrepen vanaf Economy Comfort",
      ruimbagage23kg: "Inbegrepen in Economy Comfort en Business",
    },
    hubs: ["Amsterdam (AMS)"],
    destinations: 163,
  },
  {
    slug: "transavia",
    name: "Transavia",
    iata: "HV",
    emoji: "🟢",
    country: "Nederland",
    type: "lowcost",
    description: "Transavia is de lowcost dochtermaatschappij van KLM en vliegt voornamelijk op vakantiebestemmingen in Europa en Noord-Afrika.",
    baggage: {
      handbagage: "1 stuk, max 10 kg, 55x35x25 cm",
      ruimbagage: "Niet inbegrepen — bijboeken van €15",
      ruimbagage23kg: "Bijboeken van €25",
    },
    hubs: ["Amsterdam (AMS)", "Rotterdam (RTM)", "Eindhoven (EIN)"],
    destinations: 95,
  },
  {
    slug: "ryanair",
    name: "Ryanair",
    iata: "FR",
    emoji: "💛",
    country: "Ierland",
    type: "lowcost",
    description: "Ryanair is Europa's grootste lowcost luchtvaartmaatschappij en vliegt op honderden Europese routes, vaak tegen de laagste tarieven.",
    baggage: {
      handbagage: "1 kleine tas, max 40x20x25 cm (gratis). Grotere tas bijboeken",
      ruimbagage: "Niet inbegrepen — bijboeken van €10",
      ruimbagage23kg: "Bijboeken van €20",
    },
    hubs: ["Dublin (DUB)", "London Stansted (STN)", "Eindhoven (EIN)"],
    destinations: 230,
  },
  {
    slug: "easyjet",
    name: "easyJet",
    iata: "U2",
    emoji: "🟠",
    country: "Verenigd Koninkrijk",
    type: "lowcost",
    description: "easyJet is een van de grootste lowcost maatschappijen van Europa met sterke aanwezigheid op Schiphol en vluchten naar 130+ bestemmingen.",
    baggage: {
      handbagage: "1 stuk, max 15 kg, 56x45x25 cm",
      ruimbagage: "Niet inbegrepen — bijboeken van €13",
      ruimbagage23kg: "Bijboeken van €23",
    },
    hubs: ["Amsterdam (AMS)", "London Gatwick (LGW)", "Geneva (GVA)"],
    destinations: 133,
  },
  {
    slug: "tui-fly",
    name: "TUI fly",
    iata: "OR",
    emoji: "❤️",
    country: "Nederland",
    type: "charter",
    description: "TUI fly is de chartermaatschappij van TUI Group en vliegt hoofdzakelijk op populaire vakantiebestemmingen in Europa, Noord-Afrika en verder.",
    baggage: {
      handbagage: "1 stuk, max 10 kg, 55x40x23 cm",
      ruimbagage: "Inbegrepen bij pakketreizen",
      ruimbagage23kg: "Inbegrepen bij pakketreizen",
    },
    hubs: ["Amsterdam (AMS)", "Rotterdam (RTM)", "Eindhoven (EIN)"],
    destinations: 75,
  },
  {
    slug: "vueling",
    name: "Vueling",
    iata: "VY",
    emoji: "🔵",
    country: "Spanje",
    type: "lowcost",
    description: "Vueling is een Spaanse lowcost maatschappij die vanuit Amsterdam vliegt op Spaanse en Mediterrane bestemmingen.",
    baggage: {
      handbagage: "1 stuk, max 10 kg, 55x40x20 cm",
      ruimbagage: "Niet inbegrepen — bijboeken van €15",
      ruimbagage23kg: "Bijboeken van €25",
    },
    hubs: ["Barcelona (BCN)", "Amsterdam (AMS)"],
    destinations: 120,
  },
  {
    slug: "emirates",
    name: "Emirates",
    iata: "EK",
    emoji: "🇦🇪",
    country: "Verenigde Arabische Emiraten",
    type: "fullservice",
    description: "Emirates is een van 's werelds beste luchtvaartmaatschappijen en vliegt vanuit Amsterdam naar Dubai en via Dubai naar meer dan 140 bestemmingen.",
    baggage: {
      handbagage: "2 stuks, max 7 kg per stuk",
      ruimbagage: "Inbegrepen: 25 kg (Economy), 30 kg (Business)",
      ruimbagage23kg: "Altijd inbegrepen",
    },
    hubs: ["Dubai (DXB)"],
    destinations: 140,
  },
  {
    slug: "lufthansa",
    name: "Lufthansa",
    iata: "LH",
    emoji: "🇩🇪",
    country: "Duitsland",
    type: "fullservice",
    description: "Lufthansa is de grootste Duitse luchtvaartmaatschappij en vliegt vanuit Amsterdam via Frankfurt en München naar wereldwijde bestemmingen.",
    baggage: {
      handbagage: "1 stuk, max 8 kg, 55x40x23 cm",
      ruimbagage: "Inbegrepen in de meeste tarieven",
      ruimbagage23kg: "Inbegrepen",
    },
    hubs: ["Frankfurt (FRA)", "München (MUC)"],
    destinations: 220,
  },
]

export function getAirline(slug: string): Airline | undefined {
  return airlines.find((a) => a.slug === slug)
}
