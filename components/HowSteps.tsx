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

export default function HowSteps() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10">
      <h2 className="text-2xl font-black tracking-tight">كيف تستعمل الدليل؟</h2>
      <ol className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="grid grid-cols-[auto_1fr] items-baseline gap-4 py-4 md:grid-cols-[80px_220px_1fr] md:gap-6"
          >
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
  );
}
