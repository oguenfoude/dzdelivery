import Link from "next/link";
import type { Carrier } from "@/lib/carriers";
import CarrierLogo from "./CarrierLogo";

function CarrierCard({ carrier, index }: { carrier: Carrier; index: number }) {
  return (
    <article
      style={{ "--i": 2 + index } as React.CSSProperties}
      className="reveal group relative flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-900 hover:shadow-[0_28px_50px_-28px_rgba(9,9,11,0.35)] active:scale-[0.99]"
    >
      <div className="rounded-2xl border border-zinc-100 bg-white p-4">
        <CarrierLogo carrier={carrier} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <h3 className="text-lg font-extrabold tracking-tight">
          <span dir="ltr">{carrier.name}</span>
          <span className="text-zinc-300"> · </span>
          {carrier.nameAr}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-emerald-700">
          <span className="dot-live h-1.5 w-1.5 rounded-full bg-emerald-500" />
          تعمل الآن
        </span>
      </div>
      {carrier.tagline && (
        <p className="mt-0.5 text-xs text-zinc-400" dir="ltr">
          {carrier.tagline}
        </p>
      )}
      {carrier.parent && (
        <p className="mt-2 inline-block w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600">
          جزء من {carrier.parentAr} <span dir="ltr">({carrier.parent})</span> · الدفع عند الاستلام
        </p>
      )}
      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4 text-sm">
        <div>
          <dt className="text-xs text-zinc-400">التغطية</dt>
          <dd className="mt-0.5 font-bold">{carrier.coverage}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-400">توصيل للمنزل</dt>
          <dd className="mt-0.5 font-bold">{carrier.homeFrom ?? carrier.startingPrice}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-400">مكتب</dt>
          <dd className="mt-0.5 font-bold">{carrier.deskFrom ?? carrier.startingPrice}</dd>
        </div>
      </dl>
      {(carrier.website || carrier.tracking) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          {carrier.website && (
            <>
              <span className="text-zinc-400">الموقع:</span>
              <a
                href={carrier.website}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="relative z-[1] font-mono text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-red-600"
              >
                {carrier.website.replace("https://", "")}
              </a>
            </>
          )}
          {carrier.tracking && (
            <>
              <span className="text-zinc-400">التتبع:</span>
              <a
                href={carrier.tracking}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="relative z-[1] font-mono text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-red-600"
              >
                {carrier.tracking.replace("https://", "")}
              </a>
            </>
          )}
        </div>
      )}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-sm font-extrabold text-red-600">
          <span>عرض الأسعار</span>
          <span aria-hidden className="transition group-hover:-translate-x-1">
            ←
          </span>
        </div>
      </div>
      <Link
        href={`/${carrier.id}`}
        aria-label={`عرض أسعار ${carrier.nameAr}`}
        className="absolute inset-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      />
    </article>
  );
}

export default function CarrierCards({ carriers }: { carriers: Carrier[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10">
      <div className="reveal mb-5 flex items-end justify-between" style={{ "--i": 2 } as React.CSSProperties}>
        <h2 className="text-2xl font-black tracking-tight">شركات التوصيل</h2>
        <span className="font-mono text-xs tabular-nums text-zinc-400" dir="ltr">
          {carriers.length} تعمل
        </span>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {carriers.map((c, i) => (
          <CarrierCard key={c.id} carrier={c} index={i} />
        ))}
      </div>
    </section>
  );
}
