const SERVICE_FEATURES = [
  {
    n: "01",
    t: "صفحة هبوط سريعة",
    d: "مصممة لمنتج واحد والدفع عند الاستلام، تفتح بسرعة على الهاتف.",
  },
  {
    n: "02",
    t: "استضافة سنة كاملة",
    d: "الاستضافة والنطاق علينا — تستلم رابطاً جاهزاً بدون أي إعداد.",
  },
  {
    n: "03",
    t: "ربط Google Sheets",
    d: "كل طلب يسجَّل تلقائياً في جدول تتابع منه الزبائن وتتصل بهم.",
  },
  {
    n: "04",
    t: "تنبيه فوري",
    d: "تفاصيل كل طلب توصلك لحظة إرساله على الإيميل أو تيليجرام.",
  },
];

const SERVICE_STEPS = [
  { n: "1", t: "تحكيلي على منتجك", d: "مكالمة أو واتساب، نفهم منتجك وزبونك." },
  { n: "2", t: "نبني ونربط كلش", d: "الصفحة + الاستضافة + الشيت + التنبيهات." },
  { n: "3", t: "تستقبل الطلبات", d: "تنشر الرابط وتبدأ الطلبات توصلك." },
];

export default function ServiceBand() {
  return (
    <section id="service" className="scroll-mt-6 bg-zinc-950 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <h2 className="max-w-[22ch] text-3xl font-black leading-[1.35] tracking-tight md:text-4xl">
          تبيع عبر الإنترنت؟ صفحة هبوط{" "}
          <span className="text-red-500">تجيب لك الطلبات</span> من أول يوم.
        </h2>
        <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-zinc-400 md:text-base">
          نبني لك صفحة طلب سريعة لمنتج واحد: تستقبل طلبات الدفع عند
          الاستلام، وتشوفها في Google Sheets مع تنبيه فوري على الإيميل أو
          تيليجرام — والاستضافة علينا لسنة كاملة.
        </p>

        <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {SERVICE_FEATURES.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[auto_1fr] items-baseline gap-4 py-4 md:grid-cols-[80px_240px_1fr] md:gap-6"
            >
              <span className="font-mono text-sm font-bold tabular-nums text-red-500" dir="ltr">
                {s.n}
              </span>
              <h3 className="font-extrabold">{s.t}</h3>
              <p className="col-span-2 text-sm leading-relaxed text-zinc-400 md:col-span-1">
                {s.d}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {SERVICE_STEPS.map((s) => (
            <div key={s.n} className="border-t-2 border-red-600 pt-3">
              <p className="font-mono text-xs font-bold text-zinc-500" dir="ltr">
                step {s.n}
              </p>
              <h3 className="mt-1 font-extrabold">{s.t}</h3>
              <p className="mt-1 text-sm text-zinc-400">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <a
            href="tel:+213776863561"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-red-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-red-500 active:scale-[0.98]"
          >
            اتصل: <span dir="ltr" className="mr-1 font-mono tabular-nums">+213776863561</span>
          </a>
          <a
            href="https://wa.me/213776863561"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:border-white/70 active:scale-[0.98]"
          >
            واتساب
          </a>
          <span className="w-full text-xs text-zinc-500 sm:w-auto">
            السعر: اتصل للسعر — كل مشروع بسعره حسب طلبك.
          </span>
        </div>
      </div>
    </section>
  );
}
