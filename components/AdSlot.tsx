type AdSlotProps = {
  id?: string;
  size?: string;
  label?: string;
};

export default function AdSlot({ id = "slot-1", size = "970×250 / responsive", label = "مساحة إعلانية" }: AdSlotProps) {
  return (
    <section aria-label={label} className="mx-auto w-full max-w-6xl px-4 pb-10">
      <p className="mb-2 font-mono text-[11px] font-bold tabular-nums text-zinc-400" dir="ltr">
        / ads
      </p>
      <div
        className="reveal flex min-h-[120px] flex-col items-center justify-center gap-1 rounded-3xl border border-dashed border-zinc-300 bg-white/60 px-6 py-10 text-center"
        style={{ "--i": 4 } as React.CSSProperties}
      >
        <p className="text-sm font-extrabold text-zinc-400">
          {label} — {size}
        </p>
        <p className="font-mono text-[11px] tabular-nums text-zinc-300" dir="ltr">
          reserved · {id}
        </p>
      </div>
    </section>
  );
}

