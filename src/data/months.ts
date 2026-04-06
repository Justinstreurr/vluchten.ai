export interface MonthDeal {
  slug: string
  name: string
  nameNL: string
  year: number
  topDestinations: { slug: string; city: string; price: number; emoji: string }[]
  description: string
  tip: string
}

export const months: MonthDeal[] = [
  {
    slug: "januari",
    name: "January",
    nameNL: "januari",
    year: 2026,
    description: "Januari is de ideale maand voor last-minute zondealers en winterzonners. Vluchten naar de Canarische Eilanden zijn populair.",
    tip: "Boek snel — winterzon-bestemmingen zijn populair na de feestdagen.",
    topDestinations: [
      { slug: "tenerife", city: "Tenerife", price: 129, emoji: "🌋" },
      { slug: "mallorca", city: "Mallorca", price: 89, emoji: "🏖️" },
      { slug: "dubai", city: "Dubai", price: 279, emoji: "🏙️" },
    ],
  },
  {
    slug: "februari",
    name: "February",
    nameNL: "februari",
    year: 2026,
    description: "Februari is de maand van Valentijnsdag en carnaval. Romantische stedentrips naar Parijs of Rome zijn populair.",
    tip: "Valentijnsdag (14 februari) is druk — vlieg een week later voor lagere prijzen.",
    topDestinations: [
      { slug: "parijs", city: "Parijs", price: 69, emoji: "🇫🇷" },
      { slug: "rome", city: "Rome", price: 79, emoji: "🇮🇹" },
      { slug: "dubai", city: "Dubai", price: 259, emoji: "🏙️" },
    ],
  },
  {
    slug: "maart",
    name: "March",
    nameNL: "maart",
    year: 2026,
    description: "Maart markeert het begin van het reisseizoen. Steden worden weer aangenamer en voorjaarsprijzen zijn aantrekkelijk.",
    tip: "Vlieg in de eerste twee weken — voor de meivakantie-drukte.",
    topDestinations: [
      { slug: "barcelona", city: "Barcelona", price: 69, emoji: "🇪🇸" },
      { slug: "londen", city: "Londen", price: 49, emoji: "🇬🇧" },
      { slug: "madrid", city: "Madrid", price: 65, emoji: "🇪🇸" },
    ],
  },
  {
    slug: "april",
    name: "April",
    nameNL: "april",
    year: 2026,
    description: "April is ideaal voor stedentrips. Het weer is aangenaam en de menigtes zijn er nog niet. Kerstvakantie kan prijzen opdrijven.",
    tip: "Pasen en Koningsdag kunnen vluchten duurder maken. Plan er omheen.",
    topDestinations: [
      { slug: "rome", city: "Rome", price: 89, emoji: "🇮🇹" },
      { slug: "athene", city: "Athene", price: 99, emoji: "🏛️" },
      { slug: "parijs", city: "Parijs", price: 79, emoji: "🇫🇷" },
    ],
  },
  {
    slug: "mei",
    name: "May",
    nameNL: "mei",
    year: 2026,
    description: "Mei is een van de beste reismaanden: aangenaam weer, geen hoogseizoen prijzen en minder drukte op populaire bestemmingen.",
    tip: "Één van de beste maanden om te vliegen — boek nu voor de beste keuze.",
    topDestinations: [
      { slug: "barcelona", city: "Barcelona", price: 79, emoji: "🇪🇸" },
      { slug: "mallorca", city: "Mallorca", price: 99, emoji: "🏖️" },
      { slug: "ibiza", city: "Ibiza", price: 109, emoji: "🎉" },
    ],
  },
  {
    slug: "juni",
    name: "June",
    nameNL: "juni",
    year: 2026,
    description: "Juni is de opstap naar het zomerseizoen. Heerlijk warm, maar nog voor de grote zomerdrukte. Ideaal voor strand en stedentrips.",
    tip: "Vlieg vóór 20 juni — daarna beginnen de Nederlandse schoolvakanties.",
    topDestinations: [
      { slug: "ibiza", city: "Ibiza", price: 119, emoji: "🎉" },
      { slug: "athene", city: "Athene", price: 109, emoji: "🏛️" },
      { slug: "mallorca", city: "Mallorca", price: 119, emoji: "🏖️" },
    ],
  },
  {
    slug: "juli",
    name: "July",
    nameNL: "juli",
    year: 2026,
    description: "Juli is hoogseizoen. Verwacht hogere prijzen maar ook de beste garantie op mooi weer.",
    tip: "Boek minimaal 4 maanden van tevoren voor de beste zomertarieven.",
    topDestinations: [
      { slug: "mallorca", city: "Mallorca", price: 169, emoji: "🏖️" },
      { slug: "barcelona", city: "Barcelona", price: 139, emoji: "🇪🇸" },
      { slug: "ibiza", city: "Ibiza", price: 189, emoji: "🎉" },
    ],
  },
  {
    slug: "augustus",
    name: "August",
    nameNL: "augustus",
    year: 2026,
    description: "Augustus is het drukste reismaand van het jaar. Prijzen zijn hoog — maar het is ook de perfecte maand voor een zomervakantie.",
    tip: "Vermijd de eerste twee weken als je wilt besparen. Vliegen vlak na 20 augustus is al goedkoper.",
    topDestinations: [
      { slug: "tenerife", city: "Tenerife", price: 199, emoji: "🌋" },
      { slug: "mallorca", city: "Mallorca", price: 189, emoji: "🏖️" },
      { slug: "new-york", city: "New York", price: 499, emoji: "🗽" },
    ],
  },
  {
    slug: "september",
    name: "September",
    nameNL: "september",
    year: 2026,
    description: "September is de absolute favoriete maand van ervaren reizigers: nog warm genoeg, stukken goedkoper en veel minder druk.",
    tip: "September is de beste maand — vliegprijzen dalen gemiddeld 25% ten opzichte van augustus.",
    topDestinations: [
      { slug: "barcelona", city: "Barcelona", price: 79, emoji: "🇪🇸" },
      { slug: "rome", city: "Rome", price: 89, emoji: "🇮🇹" },
      { slug: "athene", city: "Athene", price: 99, emoji: "🏛️" },
    ],
  },
  {
    slug: "oktober",
    name: "October",
    nameNL: "oktober",
    year: 2026,
    description: "Oktober is ideaal voor culturele trips. Herfstvakantie kan voor piek zorgen, maar verder zijn de prijzen aangenaam.",
    tip: "Herfstvakantie (week 42) is druk. Vlieg in de week ervoor of erna.",
    topDestinations: [
      { slug: "madrid", city: "Madrid", price: 65, emoji: "🇪🇸" },
      { slug: "parijs", city: "Parijs", price: 69, emoji: "🇫🇷" },
      { slug: "tokyo", city: "Tokyo", price: 549, emoji: "🇯🇵" },
    ],
  },
  {
    slug: "november",
    name: "November",
    nameNL: "november",
    year: 2026,
    description: "November is de ideale maand voor verre reizen. Dubai, New York en Azië-bestemmingen zijn perfect in november.",
    tip: "Black Friday deals zijn ook beschikbaar voor vluchten — houd vluchten.ai in de gaten.",
    topDestinations: [
      { slug: "dubai", city: "Dubai", price: 259, emoji: "🏙️" },
      { slug: "new-york", city: "New York", price: 349, emoji: "🗽" },
      { slug: "tenerife", city: "Tenerife", price: 139, emoji: "🌋" },
    ],
  },
  {
    slug: "december",
    name: "December",
    nameNL: "december",
    year: 2026,
    description: "December is de maand van kerst en nieuwjaar. Kerstvakantie is altijd duur — maar begin december is nog redelijk geprijsd.",
    tip: "Vlieg vóór 20 december of ná 3 januari voor aanmerkelijk lagere tarieven.",
    topDestinations: [
      { slug: "dubai", city: "Dubai", price: 299, emoji: "🏙️" },
      { slug: "new-york", city: "New York", price: 449, emoji: "🗽" },
      { slug: "tokyo", city: "Tokyo", price: 599, emoji: "🇯🇵" },
    ],
  },
]

export function getMonth(slug: string): MonthDeal | undefined {
  return months.find((m) => m.slug === slug)
}
