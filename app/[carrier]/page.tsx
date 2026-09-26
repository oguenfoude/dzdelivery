import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarrier } from "@/lib/carriers";
import { carrierStats } from "@/lib/fees";
import CarrierLogo from "@/components/CarrierLogo";
import AdSlot from "@/components/AdSlot";
import CarrierDetail, { type Availability } from "./CarrierDetail";

type Params = { carrier: string };
type Search = { wilaya?: string; q?: string; t?: string };

export function generateStaticParams(): Params[] {
  return [{ carrier: "redex" }, { carrier: "anderson" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { carrier: id } = await params;
  const carrier = getCarrier(id);
  if (!carrier) {
    return { title: "شركة غير موجودة | dz-delivery" };
  }
  if (!carrier.active) {
    return {
      title: carrier.name + " · " + carrier.nameAr + " — قريباً | dz-delivery",
    description: "أسعار التوصيل الخاصة بـ " + carrier.nameAr + " لم تُنشر بعد — قريباً.",
  };
  }
  const stats = carrierStats(id);
  return {
    title: carrier.name + " · " + carrier.nameAr + " — أسعار التوصيل لـ 58 ولاية | dz-delivery",
    description: "ابحث عن أسعار التوصيل " + carrier.nameAr + " لأي بلدية — 58 ولاية، " + stats.communes + " بلدية. توصيل للمنزل والمكتب بالدينار الجزائري.",
  };
}

function TopBar() {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-5">
      <Link href="/" className="flex items-center gap-2.5">
        <img
          src="/logo.svg"
          alt="شعار dz-delivery"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="text-sm font-extrabold tracking-tight">
          dz-delivery
          <span className="mr-2 font-medium text-zinc-400">دليل أسعار التوصيل</span>
        </span>
      </Link>
      <Link
        href="/"
        className="rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-bold transition hover:border-zinc-900 active:scale-[0.98]"
      >
        ← كل الشركات
      </Link>
    </div>
  );
}

const SOON_ITEMS = [
  "البحث بالولاية (58 ولاية) والبلدية",
  "جدول أسعار توصيل للمنزل والمكتب بالدينار الجزائري",
  "تحميل البيانات JSON / CSV / Excel",
];

export default async function CarrierPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { carrier: id } = await params;
  const sp = await searchParams;
  const carrier = getCarrier(id);

  if (!carrier) notFound();

  // Inactive carrier — soon page (no table, no fetch)
  if (!carrier.active) {
    return (
      <main className="bg-stone-50 pb-16 text-zinc-900">
        <TopBar />
        <header className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 pb-10 pt-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="inline-block rounded-2xl border border-zinc-100 bg-white p-4">
              <CarrierLogo carrier={carrier} />
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              <span dir="ltr">{carrier.name}</span> · {carrier.nameAr}
            </h1>
            <p className="mt-3 max-w-[50ch] leading-relaxed text-zinc-500">
              {carrier.tagline} — أسعار التوصيل لم تُنشر بعد. ستجد هنا صفحة
              البحث والجدول والتحميل نفسها فور إضافة البيانات.
            </p>
            <span className="mt-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              قريباً
            </span>
          </div>
          <aside className="rounded-3xl border border-zinc-200 bg-white p-6 lg:col-span-2">
            <p className="font-mono text-xs text-red-600">
              قريباً · coming soon
            </p>
            <ul className="mt-3 divide-y divide-zinc-100 text-sm">
              {SOON_ITEMS.map((t) => (
                <li key={t} className="py-2.5 text-zinc-600">
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </header>
        <footer className="mx-auto w-full max-w-6xl px-4 text-xs text-zinc-400">
          <p>dz-delivery — أسعار {carrier.nameAr} تُضاف قريباً</p>
        </footer>
      </main>
    );
  }

  // Active carrier — full experience
  const parsedWilaya = Number(sp?.wilaya);
  const initialWilaya =
    Number.isInteger(parsedWilaya) && parsedWilaya >= 1 && parsedWilaya <= 58
      ? parsedWilaya
      : 16;
  const initialQuery = typeof sp?.q === "string" ? sp.q : "";
  const initialAvail: Availability =
    sp?.t === "home" || sp?.t === "desk" ? sp.t : "all";
  const stats = carrierStats(id);

  return (
    <main className="bg-stone-50 pb-16 text-zinc-900">
      <TopBar />
      <header className="mx-auto w-full max-w-6xl px-4 pb-8 pt-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-block rounded-2xl border border-zinc-100 bg-white p-3">
              <CarrierLogo carrier={carrier} />
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              <span dir="ltr">{carrier.name}</span> · {carrier.nameAr}
            </h1>
            <p className="mt-3 leading-relaxed text-zinc-500">
              أسعار التوصيل لـ 58 ولاية و{stats.communes} بلدية — اختر الولاية وابحث عن
              البلدية بالفرنسية.
              {carrier.parent && (
                <span className="mr-2 font-bold text-zinc-700">
                  جزء من {carrier.parentAr} <span dir="ltr">({carrier.parent})</span> · الدفع عند الاستلام
                </span>
              )}
            </p>
          </div>
          <dl className="grid shrink-0 grid-cols-2 gap-6 rounded-2xl border border-zinc-200 bg-white px-6 py-4 sm:grid-cols-4">
            {[
              { v: "58", l: "ولاية" },
              { v: String(stats.communes), l: "بلدية" },
              { v: stats.homeMin != null ? "من " + stats.homeMin + " دج" : "—", l: "توصيل للمنزل" },
              { v: stats.deskMin != null ? "من " + stats.deskMin + " دج" : "—", l: "مكتب" },
            ].map((s) => (
              <div key={s.l}>
                <dd className="font-mono text-2xl font-bold tabular-nums">{s.v}</dd>
                <dt className="mt-0.5 text-xs text-zinc-400">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
        <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          {carrier.website && (
            <div className="bg-white p-4">
              <dt className="text-xs text-zinc-400">الموقع الرسمي</dt>
              <dd className="mt-1 text-sm font-bold">
                <a
                  href={carrier.website}
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="font-mono text-zinc-900 underline decoration-red-600 decoration-2 underline-offset-4 transition hover:text-red-600"
                >
                  {carrier.website.replace("https://", "")}
                </a>
              </dd>
            </div>
          )}
          {carrier.tracking && (
            <div className="bg-white p-4">
              <dt className="text-xs text-zinc-400">تتبع الطرود</dt>
              <dd className="mt-1 text-sm font-bold">
                <a
                  href={carrier.tracking}
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="font-mono text-zinc-900 underline decoration-red-600 decoration-2 underline-offset-4 transition hover:text-red-600"
                >
                  {carrier.tracking.replace("https://", "")}
                </a>
              </dd>
            </div>
          )}
          <div className="bg-white p-4">
            <dt className="text-xs text-zinc-400">التغطية</dt>
            <dd className="mt-1 text-sm font-bold">58 ولاية · {stats.communes} بلدية</dd>
          </div>
          <div className="bg-white p-4">
            <dt className="text-xs text-zinc-400">الدفع</dt>
            <dd className="mt-1 text-sm font-bold">عند الاستلام</dd>
          </div>
        </dl>
      </header>

      <AdSlot id={`${carrier.id}-page`} />

      <div className="mx-auto w-full max-w-6xl px-4">
        <CarrierDetail
          carrierId={carrier.id}
          initialWilaya={initialWilaya}
          initialQuery={initialQuery}
          initialAvail={initialAvail}
        />
      </div>

      <footer className="mx-auto w-full max-w-6xl px-4 pt-2 text-xs text-zinc-400">
        <p>dz-delivery — أسعار {carrier.name} لـ 58 ولاية · {stats.communes} بلدية</p>
      </footer>
    </main>
  );
}

