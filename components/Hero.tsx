const HERO_STATS = [
  { v: "58", l: "ولاية" },
  { v: "2", l: "شركات توصيل" },
];

export default function Hero() {
  return (
    <header className="mx-auto w-full max-w-6xl px-4 pb-10 pt-10 md:pt-14">
      <div className="reveal max-w-3xl" style={{ "--i": 0 } as React.CSSProperties}>
        <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold text-zinc-600">
          <span className="dot-live h-1.5 w-1.5 rounded-full bg-emerald-500" />
            RedEx وأندرسون — أسعار حقيقية بالدينار
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
        className="reveal mt-8 grid grid-cols-2 gap-6 border-t border-zinc-200 pt-6"
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
  );
}
