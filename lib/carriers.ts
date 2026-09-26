export interface Carrier {
  id: string;
  name: string;
  nameAr: string;
  active: boolean;
  /** Parent company, e.g. RedEx is part of Ecotrack */
  parent?: string;
  parentAr?: string;
  website?: string;
  tracking?: string;
  /** Primary logo path (PNG saved by user) — UI falls back to SVG placeholder */
  logo?: string;
  /** SVG placeholder used while the PNG is missing */
  logoFallback?: string;
  coverage?: string;
  startingPrice?: string;
  /** Starting price split (shown on cards when present, falls back to startingPrice) */
  homeFrom?: string;
  deskFrom?: string;
  dataFile?: string;
  /** Brand accent used for the card top bar + badges (single accent per surface) */
  accent?: "ink" | "red";
  /** Brand tagline shown under the logo */
  tagline?: string;
}

export const carriers: Carrier[] = [
  {
    id: "redex",
    name: "RedEx",
    nameAr: "ريدكس",
    active: true,
    parent: "Ecotrack",
    parentAr: "إيكوتراك",
    logo: "/carriers/redex.webp",
    logoFallback: "/carriers/redex.svg",
    coverage: "58 ولاية · 1542 بلدية",
    startingPrice: "ابتداءً من 400 دج",
    homeFrom: "من 550 دج",
    deskFrom: "من 400 دج",
    dataFile: "redex.json",
    accent: "ink",
    tagline: "Anytime, anywhere",
  },
  {
    id: "anderson",
    name: "Anderson",
    nameAr: "أندرسون",
    active: true,
    website: "https://anderson-ecommerce.com",
    logo: "/carriers/anderson.png",
    logoFallback: "/carriers/anderson.svg",
    coverage: "58 ولاية · 1498 بلدية",
    startingPrice: "ابتداءً من 250 دج",
    homeFrom: "من 300 دج",
    deskFrom: "من 250 دج",
    dataFile: "anderson.json",
    accent: "red",
    tagline: "Anderson Logistique",
  },
  // Future carriers (structure ready, not active yet)
  { id: "ems", name: "EMS", nameAr: "EMS", active: false },
  { id: "yalidine", name: "Yalidine", nameAr: "ياليدين", active: false },
];

export function getCarrier(id: string): Carrier | undefined {
  return carriers.find((c) => c.id === id);
}

export function getActiveCarriers(): Carrier[] {
  return carriers.filter((c) => c.active);
}
