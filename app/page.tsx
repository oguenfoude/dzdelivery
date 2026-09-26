import Link from "next/link";
import { carriers } from "@/lib/carriers";
import CarrierLogo from "@/components/CarrierLogo";
import AdSlot from "@/components/AdSlot";

const STEPS = [
  {
    n: "01",
    t: "اختر شركة التوصيل",
    d: "ريدكس وأندرسون تعملان الآن ببيانات كاملة وبنفس طريقة البحث.",
  },
  {
    n: "02",
    t: "اختر الولاية وابحث عن البلدية",
    d: "58 ولاية في قائمة واحدة بالعربية، وبحث فوري عن البلدية بالفرنسية.",
  },
  {
    n: "03",
    t: "قارن سعر المنزل والمكتب",
    d: "كل الأسعار بالدينار الجزائري، مع حالة التوفر (متوفر / غير متوفر) لكل بلدية — مع تحميل الملفات كاملة.",
  },
];

const HERO_STATS = [
  { v: "58", l: "ولاية" },
  { v: "2", l: "شركات توصيل" },
  { v: "3040", l: "بلدية بأسعار التوصيل" },
  { v: "من 250 دج", l: "أقل سعر مكتب" },
];

const SERVICE_FEATURES = [
  {
    n: "01",
    t: "صفحة هبوط سريعة مصممة للبيع بالدفع عند الاستلام",
  },
  {
    n: "02",
    t: "استضافة لمدة سنة كاملة",
  },
  {
    n: "03",
    t: "ربط الطلبات مع Google Sheets",
  },
  {
    n: "04",
    t: "تنبيه فوري لكل طلب عبر الإيميل أو تيليجرام",
  },
];

export default function Home() {
  const redex = carriers.find((c) => c.id === "redex")!;
  const anderson = carriers.find((c) => c.id === "anderson")!;

  return (
    <main className="bg-stone-50 text-zinc-900">
      {/* Header — bare minimum */}
      <div className="border-b border-zinc-200/70">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-2.5 px-4 py-3">
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
        </div>
      </div>

      {/* Hero — what the service is, no buttons */}
      <header className="mx-auto w-full max-w-6xl px-4 pb-10 pt-10 md:pt-14">
        <div className="reveal max-w-3xl" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold text-zinc-600">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-emerald-500" />
            RedEx · جزء من إيكوتراك — أسعار حقيقية بالدينار
          </p>
          <h1 className="mt-5 text-4xl font-black leading-[1.3] tracking-tight md:text-6xl md:leading-[1.25]">
            سعر التوصيل{" "}
            <span className="underline decoration-red-600 decoration-[5px] underline-offset-8">
              الصحيح
            </span>
            ،
            <br />
            لأي بلدية في الجزائر.
          </h1>
          <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-zinc-500">
            دليل أسعار شركات التوصيل — اختر الشركة، ثم الولاية والبلدية، وقارن
            سعر التوصيل للمنزل والمكتب بالدينار الجزائري قبل تأكيد أي طلب.
          </p>
        </div>
        <dl
          className="reveal mt-8 grid grid-cols-1 gap-6 border-t border-zinc-200 pt-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {HERO_STATS.map((s) => (
            <div key={s.l}>
              <dt className="text-sm text-zinc-500">{s.l}</dt>
              <dd className="mt-1 font-mono text-3xl font-bold tabular-nums">{s.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Agencies — equal size cards */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10">
        <p className="mb-2 font-mono text-[11px] font-bold tabular-nums text-zinc-400" dir="ltr">
          / carriers
        </p>
        <div className="reveal mb-5 flex items-end justify-between" style={{ "--i": 2 } as React.CSSProperties}>
          <h2 className="text-2xl font-black tracking-tight">شركات التوصيل</h2>
          <span className="font-mono text-xs tabular-nums text-zinc-400" dir="ltr">
            2 تعمل
          </span>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          {/* RedEx — full info card */}
          <article
            style={{ "--i": 3 } as React.CSSProperties}
            className="reveal group relative flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-900 hover:shadow-[0_28px_50px_-28px_rgba(9,9,11,0.35)] active:scale-[0.99]"
          >
            <div className="rounded-2xl border border-zinc-100 bg-white p-4">
              <CarrierLogo carrier={redex} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <h3 className="text-lg font-extrabold tracking-tight">
                <span dir="ltr">RedEx</span>
                <span className="text-zinc-300"> · </span>
                ريدكس
              </h3>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-emerald-700">
                <span className="dot-live h-1.5 w-1.5 rounded-full bg-emerald-500" />
                تعمل الآن
              </span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-400" dir="ltr">
              {redex.tagline}
            </p>
            <p className="mt-2 inline-block w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600">
              جزء من {redex.parentAr} <span dir="ltr">({redex.parent})</span> · الدفع عند الاستلام
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4 text-sm">
              <div>
                <dt className="text-xs text-zinc-400">التغطية</dt>
                <dd className="mt-0.5 font-bold">{redex.coverage}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">توصيل للمنزل</dt>
                <dd className="mt-0.5 font-bold">
                  {redex.homeFrom ?? redex.startingPrice}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">مكتب</dt>
                <dd className="mt-0.5 font-bold">
                  {redex.deskFrom ?? redex.startingPrice}
                </dd>
              </div>
            </dl>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <span className="text-zinc-400">الموقع:</span>
              <a
                href="https://redex.delivery"
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="relative z-[1] font-mono text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-red-600"
              >
                redex.delivery
              </a>
              <span className="text-zinc-400">التتبع:</span>
              <a
                href="https://suivi.ecotrack.dz"
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="relative z-[1] font-mono text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-red-600"
              >
                suivi.ecotrack.dz
              </a>
            </div>
            <div className="mt-auto pt-4">
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-sm font-extrabold text-red-600">
                <span>عرض الأسعار</span>
                <span aria-hidden className="transition group-hover:-translate-x-1">
                  ←
                </span>
              </div>
            </div>
            <Link
              href="/redex"
              aria-label="عرض أسعار RedEx"
              className="absolute inset-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            />
          </article>

          {/* Anderson — live card, same size */}
          <article
            style={{ "--i": 4 } as React.CSSProperties}
            className="reveal group relative flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-900 hover:shadow-[0_28px_50px_-28px_rgba(9,9,11,0.35)] active:scale-[0.99]"
          >
            <div className="rounded-2xl border border-zinc-100 bg-white p-4">
              <CarrierLogo carrier={anderson} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <h3 className="text-lg font-extrabold tracking-tight">
                <span dir="ltr">Anderson</span>
                <span className="text-zinc-300"> · </span>
                أندرسون
              </h3>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-emerald-700">
                <span className="dot-live h-1.5 w-1.5 rounded-full bg-emerald-500" />
                تعمل الآن
              </span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-400" dir="ltr">
              {anderson.tagline}
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4 text-sm">
              <div>
                <dt className="text-xs text-zinc-400">التغطية</dt>
                <dd className="mt-0.5 font-bold">{anderson.coverage}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">توصيل للمنزل</dt>
                <dd className="mt-0.5 font-bold">{anderson.homeFrom ?? anderson.startingPrice}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">مكتب</dt>
                <dd className="mt-0.5 font-bold">{anderson.deskFrom ?? anderson.startingPrice}</dd>
              </div>
            </dl>
            <div className="mt-auto pt-4">
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-sm font-extrabold text-red-600">
                <span>عرض الأسعار</span>
                <span aria-hidden className="transition group-hover:-translate-x-1">
                  ←
                </span>
              </div>
            </div>
            <Link
              href="/anderson"
              aria-label="عرض أسعار أندرسون"
              className="absolute inset-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            />
          </article>
        </div>
      </section>

      <AdSlot id="home-agencies" />

      {/* Steps — numbered rows, not cards */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10">
        <p className="mb-2 font-mono text-[11px] font-bold tabular-nums text-zinc-400" dir="ltr">
          / guide
        </p>
        <h2 className="text-2xl font-black tracking-tight">كيف تستعمل الدليل؟</h2>
        <ol className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
          {STEPS.map((s) => (
            <li key={s.n} className="grid grid-cols-[auto_1fr] items-baseline gap-4 py-4 md:grid-cols-[80px_220px_1fr] md:gap-6">
              <span className="font-mono text-sm font-bold tabular-nums text-red-600" dir="ltr">
                {s.n}
              </span>
              <h3 className="font-extrabold">{s.t}</h3>
              <p className="col-span-2 text-sm leading-relaxed text-zinc-500 md:col-span-1">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Service promo — landing pages for sellers */}
      <section id="service" className="mx-auto w-full max-w-6xl scroll-mt-6 px-4 pb-10">
        <p className="mb-2 font-mono text-[11px] font-bold tabular-nums text-zinc-400" dir="ltr">
          / service
        </p>
        <h2 className="max-w-[30ch] text-2xl font-black leading-snug tracking-tight">
          صفحة هبوط لمتجرك؟
        </h2>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-zinc-500">
          أصمم صفحات هبوط سريعة لباعة التجارة الإلكترونية — تستقبل طلبات الدفع عند الاستلام مباشرة.
        </p>
        <ol className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
          {SERVICE_FEATURES.map((s) => (
            <li key={s.n} className="grid grid-cols-[auto_1fr] items-baseline gap-4 py-4 md:grid-cols-[80px_1fr] md:gap-6">
              <span className="font-mono text-sm font-bold tabular-nums text-red-600" dir="ltr">
                {s.n}
              </span>
              <h3 className="font-extrabold">{s.t}</h3>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <a
            href="tel:+213776863561"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 active:scale-[0.98]"
          >
            اتصل: <span dir="ltr" className="mr-1 font-mono tabular-nums">+213776863561</span>
          </a>
          <a
            href="https://wa.me/213776863561"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-bold transition hover:border-zinc-900 active:scale-[0.98]"
          >
            واتساب
          </a>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-zinc-400">
          <p>dz-delivery — أسعار RedEx وأندرسون لـ 58 ولاية</p>
          <p className="font-mono tabular-nums">
            58 ولاية · شركتان · 3040 بلدية بأسعار
          </p>
        </div>
      </footer>
    </main>
  );
}
