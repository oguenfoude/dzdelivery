"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { WILAYA_ARABIC_NAMES, WILAYA_LATIN_NAMES } from "@/lib/fees";

interface CommuneRow {
  commune_id: number;
  commune_name: string;
  domicile_available: boolean;
  domicile_fee_da: number | null;
  stop_desk_available: boolean;
  stop_desk_fee_da: number | null;
}

interface FeesResponse {
  carrier: string;
  wilaya_id: number;
  wilaya_name: string;
  total_communes: number;
  communes: CommuneRow[];
}

export type Availability = "all" | "home" | "desk";

const AVAIL_OPTIONS: { id: Availability; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "home", label: "منزل" },
  { id: "desk", label: "مكتب" },
];

function downloadsFor(carrierId: string) {
  if (carrierId === "anderson") {
    return [
      { href: "/downloads/anderson-wilayas-58.json", t: "ملف JSON الكامل", s: "للمطورين · 58 ولاية", fmt: "JSON", primary: true },
      { href: "/downloads/anderson-communes-1498.csv", t: "جدول البلديات", s: "يفتح في Excel · 1498 صف", fmt: "CSV", primary: false },
      { href: "/downloads/anderson-delivery-fees.xlsx", t: "ملف Excel مفلتر", s: "جدولان: الولايات + البلديات", fmt: "XLSX", primary: false },
      { href: "/downloads/anderson-wilayas-58-summary.csv", t: "ملخص الولايات", s: "58 صفاً · أدنى وأعلى سعر لكل ولاية", fmt: "CSV", primary: false },
    ];
  }
  return [
    { href: "/downloads/redex-wilayas-58.json", t: "ملف JSON الكامل", s: "للمطورين · 58 ولاية", fmt: "JSON", primary: true },
    { href: "/downloads/redex-communes-1542.csv", t: "جدول البلديات", s: "يفتح في Excel · 1542 صف", fmt: "CSV", primary: false },
    { href: "/downloads/redex-delivery-fees.xlsx", t: "ملف Excel مفلتر", s: "جدولان: الولايات + البلديات", fmt: "XLSX", primary: false },
    { href: "/downloads/redex-wilayas-58-summary.csv", t: "ملخص الولايات", s: "58 صفاً · أدنى وأعلى سعر لكل ولاية", fmt: "CSV", primary: false },
  ];
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function SkeletonRows() {
  return (
    <tbody aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => (
        <tr key={i} className="border-t border-zinc-100">
          <td className="px-4 py-3">
            <div className="skel h-4 w-32" />
          </td>
          <td className="px-4 py-3">
            <div className="skel h-4 w-20" />
          </td>
          <td className="px-4 py-3">
            <div className="skel h-4 w-20" />
          </td>
          <td className="px-4 py-3">
            <div className="skel h-5 w-16 rounded-full" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default function CarrierDetail({
  carrierId,
  initialWilaya = 16,
  initialQuery = "",
  initialAvail = "all",
}: {
  carrierId: string;
  initialWilaya?: number;
  initialQuery?: string;
  initialAvail?: Availability;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [wilaya, setWilaya] = useState<number>(initialWilaya);
  const [query, setQuery] = useState(initialQuery);
  const [avail, setAvail] = useState<Availability>(initialAvail);
  const [rows, setRows] = useState<CommuneRow[]>([]);
  const [wilayaName, setWilayaName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  // Back/forward: server re-renders with new searchParams -> sync state
  useEffect(() => {
    setWilaya(initialWilaya);
  }, [initialWilaya]);
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);
  useEffect(() => {
    setAvail(initialAvail);
  }, [initialAvail]);

  const wilayaOptions = useMemo(() => {
    const list: { id: number; label: string }[] = [];
    for (let id = 1; id <= 58; id++) {
      const ar = WILAYA_ARABIC_NAMES[id] ?? "";
      const latin = WILAYA_LATIN_NAMES[id] ?? "";
      list.push({ id, label: `${pad(id)} - ${ar} (${latin})` });
    }
    return list;
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetch(`/api/fees?carrier=${carrierId}&wilaya=${wilaya}`)
      .then(async (r) => {
        const data = (await r.json()) as FeesResponse & { error?: string };
        if (!r.ok) throw new Error(data.error ?? "Failed to load fees");
        if (!cancelled) {
          setRows(data.communes);
          setWilayaName(data.wilaya_name);
        }
      })
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message);
          setRows([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [wilaya, carrierId, attempt]);

  // URL sync: wilaya + q + t (debounced for q so typing doesn't spam history)
  useEffect(() => {
    const t = setTimeout(() => {
      const p = new URLSearchParams();
      p.set("wilaya", String(wilaya));
      const qq = query.trim();
      if (qq) p.set("q", qq);
      if (avail !== "all") p.set("t", avail);
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [wilaya, query, avail, pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (avail === "home" && !r.domicile_available) return false;
      if (avail === "desk" && !r.stop_desk_available) return false;
      if (!q) return true;
      return r.commune_name.toLowerCase().includes(q);
    });
  }, [rows, query, avail]);

  const homeCount = useMemo(() => rows.filter((r) => r.domicile_available).length, [rows]);
  const deskCount = useMemo(() => rows.filter((r) => r.stop_desk_available).length, [rows]);

  const resetFilters = () => {
    setQuery("");
    setAvail("all");
  };

  const latinName = WILAYA_LATIN_NAMES[wilaya] || wilayaName || "";

  return (
    <div>
      {/* Filter bar — sticky, stacks on mobile */}
      <section
        aria-label="تصفية البلديات"
        className="reveal sticky top-0 z-10 rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-[0_16px_36px_-24px_rgba(9,9,11,0.35)] backdrop-blur"
        style={{ "--i": 0 } as React.CSSProperties}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[230px_1fr_auto] md:items-end">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-zinc-500">
              الولاية · Wilaya
            </span>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(Number(e.target.value))}
              aria-label="اختر الولاية"
              className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm font-bold outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/15"
            >
              {wilayaOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-[11px] leading-relaxed text-zinc-400">
              58 ولاية — اختر الولاية لعرض بلدياتها
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-zinc-500">
              البلدية · Commune
            </span>
            <span className="relative block">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالفرنسية… مثال: Bir"
                aria-label="ابحث عن البلدية بالفرنسية"
                className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-11 pr-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="مسح البحث"
                  className="absolute left-1.5 top-1/2 flex h-[32px] w-[32px] -translate-y-1/2 items-center justify-center rounded-lg text-lg leading-none text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.96]"
                >
                  ×
                </button>
              )}
            </span>
            <span className="mt-1 block text-[11px] leading-relaxed text-zinc-400">
              أسماء البلديات بالحروف اللاتينية فقط — اكتب جزءاً من الاسم
            </span>
          </label>

          <div>
            <span className="mb-1.5 block text-xs font-bold text-zinc-500">
              نوع التوصيل
            </span>
            <div
              role="group"
              aria-label="تصفية حسب نوع التوصيل"
              className="flex min-h-[44px] items-center gap-1 rounded-xl border border-zinc-300 bg-zinc-50 p-1"
            >
              {AVAIL_OPTIONS.map((o) => {
                const active = avail === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setAvail(o.id)}
                    aria-pressed={active}
                    className={[
                      "min-h-[36px] min-w-[56px] flex-1 rounded-lg px-3 text-sm font-bold transition active:scale-[0.98] md:flex-none",
                      active
                        ? "bg-zinc-950 text-white shadow"
                        : "text-zinc-500 hover:text-zinc-900",
                    ].join(" ")}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-2.5">
          <p className="text-xs text-zinc-500" aria-live="polite">
            <span className="font-mono font-bold tabular-nums text-zinc-900" dir="ltr">
              {loading ? "…" : `${filtered.length} / ${rows.length}`}
            </span>{" "}
            بلدية
            {!loading && rows.length > 0 && (
              <span className="mr-2 font-mono text-[11px] tabular-nums text-zinc-400">
                منزل {homeCount} · مكتب {deskCount}
              </span>
            )}
          </p>
          {(query.trim() || avail !== "all") && !loading && (
            <button
              type="button"
              onClick={resetFilters}
              className="min-h-[36px] rounded-lg border border-zinc-300 px-3 text-xs font-bold text-zinc-600 transition hover:border-zinc-900 hover:text-zinc-900 active:scale-[0.98]"
            >
              إعادة ضبط التصفية
            </button>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="reveal mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white" style={{ "--i": 1 } as React.CSSProperties}>
        <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-3.5">
          <h2 className="text-base font-extrabold tracking-tight">
            {pad(wilaya)} - {WILAYA_ARABIC_NAMES[wilaya]}{" "}
            {latinName && (
              <span className="font-medium text-zinc-400" dir="ltr">
                ({latinName})
              </span>
            )}
          </h2>
          <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 font-mono text-[11px] font-bold tabular-nums text-zinc-600">
            {loading ? "جارٍ التحميل…" : `${filtered.length} بلدية`}
          </span>
        </div>
        {error ? (
          <div className="px-5 py-12 text-center">
            <p className="font-extrabold">تعذّر تحميل الأسعار</p>
            <p className="mt-1 text-xs text-zinc-500">
              تحقق من الاتصال بالإنترنت ثم حاول مرة أخرى.
            </p>
            <p className="mx-auto mt-1 max-w-sm font-mono text-xs text-zinc-400" dir="ltr">
              {error}
            </p>
            <button
              onClick={() => setAttempt((a) => a + 1)}
              className="mt-4 min-h-[44px] rounded-xl bg-zinc-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
            >
              حاول مرة أخرى
            </button>
          </div>
        ) : (
          <div className="max-h-[540px] overflow-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="sticky top-0 z-[1]">
                <tr className="bg-zinc-50 text-right text-xs text-zinc-500 shadow-[0_1px_0_0_#e4e4e7]">
                  <th className="bg-zinc-50 px-4 py-2.5 font-bold">البلدية</th>
                  <th className="bg-zinc-50 px-4 py-2.5 font-bold">توصيل للمنزل (دج)</th>
                  <th className="bg-zinc-50 px-4 py-2.5 font-bold">مكتب (دج)</th>
                  <th className="bg-zinc-50 px-4 py-2.5 font-bold">التوفر</th>
                </tr>
              </thead>
              {loading ? (
                <SkeletonRows />
              ) : (
                <tbody>
                  {filtered.map((r) => {
                    const ok = r.domicile_available || r.stop_desk_available;
                    return (
                      <tr
                        key={r.commune_id}
                        className="border-t border-zinc-100 transition hover:bg-red-50/40"
                      >
                        <td className="px-4 py-2.5 font-bold" dir="ltr">
                          {r.commune_name}
                        </td>
                        <td className="px-4 py-2.5 font-mono tabular-nums">
                          {r.domicile_available && r.domicile_fee_da != null ? (
                            `${r.domicile_fee_da}`
                          ) : (
                            <span className="text-zinc-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 font-mono tabular-nums">
                          {r.stop_desk_available && r.stop_desk_fee_da != null ? (
                            `${r.stop_desk_fee_da}`
                          ) : (
                            <span className="text-zinc-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-xs">
                          <span className="inline-flex items-center gap-1.5 font-bold">
                            <span
                              aria-hidden
                              className={[
                                "h-1.5 w-1.5 rounded-full",
                                ok ? "bg-emerald-500" : "bg-zinc-300",
                              ].join(" ")}
                            />
                            <span className={ok ? "text-emerald-700" : "text-zinc-400"}>
                              {ok ? "متوفر" : "غير متوفر"}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && rows.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center">
                        <p className="font-extrabold">لا توجد بلديات مسعرة في هذه الولاية</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          هذه الشركة لا تغطي هذه الولاية حالياً — جرّب ولاية أخرى.
                        </p>
                      </td>
                    </tr>
                  )}
                  {filtered.length === 0 && rows.length > 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center">
                        <p className="font-extrabold">لا توجد بلدية بهذا الاسم</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          جرّب جزءاً من الاسم بالفرنسية، أو غيّر الولاية أو نوع التوصيل.
                        </p>
                        <button
                          onClick={resetFilters}
                          className="mt-3 min-h-[44px] rounded-xl border border-zinc-300 px-4 py-1.5 text-xs font-bold transition hover:border-zinc-900 active:scale-[0.98]"
                        >
                          مسح البحث وإعادة ضبط التصفية
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        )}
      </section>

      {/* Downloads */}
      <section className="reveal mt-4 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6" style={{ "--i": 2 } as React.CSSProperties}>
        <div className="flex items-baseline justify-between">
          <h2 className="font-extrabold tracking-tight">تحميل البيانات الكاملة</h2>
          <span className="text-[11px] text-zinc-400">
            58 ولاية · {rows.length} بلدية
          </span>
        </div>
        <div className="mt-2 divide-y divide-zinc-100 border-t border-zinc-100">
          {downloadsFor(carrierId).map((f) => (
            <a
              key={f.href}
              href={f.href}
              download
              className="group flex min-h-[44px] items-center justify-between gap-3 py-3 active:scale-[0.99]"
            >
              <span className="flex items-center gap-3">
                <span
                  dir="ltr"
                  className={[
                    "rounded-md px-2 py-1 font-mono text-[11px] font-bold",
                    f.primary
                      ? "bg-zinc-950 text-white"
                      : "bg-zinc-100 text-zinc-600",
                  ].join(" ")}
                >
                  {f.fmt}
                </span>
                <span>
                  <span className="block text-sm font-bold group-hover:underline">
                    {f.t}
                  </span>
                  <span className="block text-xs text-zinc-400">{f.s}</span>
                </span>
              </span>
              <span
                aria-hidden
                className="text-zinc-300 transition group-hover:-translate-x-1 group-hover:text-red-600"
              >
                ←
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
