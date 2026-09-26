type AdSlotProps = {
  id?: string;
  size?: string;
  label?: string;
};

export default function AdSlot({
  id = "slot-1",
  size = "970×250 / متجاوبة",
  label = "مساحة إعلانية",
}: AdSlotProps) {
  return (
    <section aria-label={label} className="mx-auto w-full max-w-6xl px-4 pb-10">
      <div className="ad-slot relative overflow-hidden rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-3 flex items-center justify-center gap-1.5"
        >
          <span className="dot-live h-1.5 w-1.5 rounded-full bg-red-500" />
          <span className="text-[11px] font-bold text-zinc-400">متاحة للحجز</span>
        </span>
        <p className="mt-3 text-xl font-black tracking-tight text-zinc-900">
          {label}
        </p>
        <p className="mt-1 font-mono text-xs tabular-nums text-zinc-400" dir="ltr">
          {size}
        </p>
        <a
          href="tel:+213776863561"
          className="mt-4 inline-flex min-h-[44px] items-center rounded-xl border border-zinc-300 px-5 py-2 text-sm font-extrabold text-zinc-900 transition hover:border-red-600 hover:text-red-600 active:scale-[0.98]"
        >
          للإعلان هنا — <span dir="ltr" className="mr-1 font-mono tabular-nums">+213776863561</span>
        </a>
        <p className="mt-3 font-mono text-[10px] tabular-nums text-zinc-300" dir="ltr">
          reserved · {id}
        </p>
      </div>
    </section>
  );
}
