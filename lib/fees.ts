import redexData from "@/data/redex.json";
import andersonData from "@/data/anderson.json";
import { getCarrier } from "./carriers";

export interface DeliveryOption {
  available: boolean;
  fee_da: number | null;
  desk_info?: string | null;
}

export interface Commune {
  commune_id: number;
  commune_name: string;
  domicile: DeliveryOption;
  stop_desk: DeliveryOption;
}

export interface Wilaya {
  wilaya_id: number;
  wilaya_name: string;
  has_stop_desk_service: boolean;
  total_communes: number;
  communes: Commune[];
}

export const WILAYA_ARABIC_NAMES: Record<number, string> = {
  1: "أدرار",
  2: "الشلف",
  3: "الأغواط",
  4: "أم البواقي",
  5: "باتنة",
  6: "بجاية",
  7: "بسكرة",
  8: "بشار",
  9: "البليدة",
  10: "البويرة",
  11: "تمنراست",
  12: "تبسة",
  13: "تلمسان",
  14: "تيارت",
  15: "تيزي وزو",
  16: "الجزائر",
  17: "الجلفة",
  18: "جيجل",
  19: "سطيف",
  20: "سعيدة",
  21: "سكيكدة",
  22: "سيدي بلعباس",
  23: "عنابة",
  24: "قالمة",
  25: "قسنطينة",
  26: "المدية",
  27: "مستغانم",
  28: "المسيلة",
  29: "معسكر",
  30: "ورقلة",
  31: "وهران",
  32: "البيض",
  33: "إليزي",
  34: "برج بوعريريج",
  35: "بومرداس",
  36: "الطارف",
  37: "تندوف",
  38: "تيسمسيلت",
  39: "الوادي",
  40: "خنشلة",
  41: "سوق أهراس",
  42: "تيبازة",
  43: "ميلة",
  44: "عين الدفلى",
  45: "النعامة",
  46: "عين تموشنت",
  47: "غرداية",
  48: "غليزان",
  49: "تيميمون",
  50: "برج باجي مختار",
  51: "أولاد جلال",
  52: "بني عباس",
  53: "عين صالح",
  54: "عين قزام",
  55: "تقرت",
  56: "جانت",
  57: "المغير",
  58: "المنيعة",
};

export const WILAYA_LATIN_NAMES: Record<number, string> = {
  1: "Adrar",
  2: "Chlef",
  3: "Laghouat",
  4: "Oum El Bouaghi",
  5: "Batna",
  6: "Béjaïa",
  7: "Biskra",
  8: "Béchar",
  9: "Blida",
  10: "Bouira",
  11: "Tamanrasset",
  12: "Tébessa",
  13: "Tlemcen",
  14: "Tiaret",
  15: "Tizi Ouzou",
  16: "Alger",
  17: "Djelfa",
  18: "Jijel",
  19: "Sétif",
  20: "Saïda",
  21: "Skikda",
  22: "Sidi Bel Abbès",
  23: "Annaba",
  24: "Guelma",
  25: "Constantine",
  26: "Médéa",
  27: "Mostaganem",
  28: "M'Sila",
  29: "Mascara",
  30: "Ouargla",
  31: "Oran",
  32: "El Bayadh",
  33: "Illizi",
  34: "Bordj Bou Arreridj",
  35: "Boumerdès",
  36: "El Tarf",
  37: "Tindouf",
  38: "Tissemsilt",
  39: "El Oued",
  40: "Khenchela",
  41: "Souk Ahras",
  42: "Tipaza",
  43: "Mila",
  44: "Aïn Defla",
  45: "Naâma",
  46: "Aïn Témouchent",
  47: "Ghardaïa",
  48: "Relizane",
  49: "Timimoun",
  50: "Bordj Badji Mokhtar",
  51: "Ouled Djellal",
  52: "Beni Abbes",
  53: "In Salah",
  54: "In Guezzam",
  55: "Touggourt",
  56: "Djanet",
  57: "El M'Ghair",
  58: "El Meniaa",
};

const datasets: Record<string, Wilaya[]> = {
  redex: redexData as Wilaya[],
  anderson: andersonData as unknown as Wilaya[],
};

export interface CarrierStats {
  wilayas: number;
  communes: number;
  homeMin: number | null;
  deskMin: number | null;
  deskCommunes: number;
}

/** Aggregate stats for a carrier — used for headers, cards and metadata. */
export function carrierStats(carrierId = "redex"): CarrierStats {
  const list = getWilayas(carrierId);
  let communes = 0;
  let deskCommunes = 0;
  let homeMin: number | null = null;
  let deskMin: number | null = null;
  for (const w of list) {
    communes += w.communes.length;
    for (const c of w.communes) {
      if (c.domicile?.available && c.domicile.fee_da != null) {
        homeMin = homeMin == null ? c.domicile.fee_da : Math.min(homeMin, c.domicile.fee_da);
      }
      if (c.stop_desk?.available && c.stop_desk.fee_da != null) {
        deskMin = deskMin == null ? c.stop_desk.fee_da : Math.min(deskMin, c.stop_desk.fee_da);
        deskCommunes += 1;
      }
    }
  }
  return { wilayas: list.length, communes, homeMin, deskMin, deskCommunes };
}

export function getWilayas(carrierId = "redex"): Wilaya[] {
  const carrier = getCarrier(carrierId);
  if (!carrier || !carrier.active) return [];
  return datasets[carrierId] ?? [];
}

export function getWilaya(carrierId: string, wilayaId: number): Wilaya | undefined {
  return getWilayas(carrierId).find((w) => w.wilaya_id === wilayaId);
}

export function searchCommunes(
  carrierId: string,
  wilayaId: number,
  query = ""
): Commune[] {
  const wilaya = getWilaya(carrierId, wilayaId);
  if (!wilaya) return [];
  const q = query.trim().toLowerCase();
  if (!q) return wilaya.communes;
  return wilaya.communes.filter((c) => c.commune_name.toLowerCase().includes(q));
}

export function wilayaDisplayName(w: Wilaya): string {
  const code = w.wilaya_id < 10 ? `0${w.wilaya_id}` : `${w.wilaya_id}`;
  const ar = WILAYA_ARABIC_NAMES[w.wilaya_id];
  return ar ? `${code} - ${ar} (${w.wilaya_name})` : `${code} - ${w.wilaya_name}`;
}
