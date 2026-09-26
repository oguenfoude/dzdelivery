import Link from "next/link";

export default function SiteBrand() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="dz-delivery — الرئيسية">
      <img
        src="/logo.svg"
        alt="شعار dz-delivery"
        width={32}
        height={32}
        className="h-8 w-8"
        loading="eager"
        decoding="async"
      />
      <span className="text-sm font-extrabold tracking-tight">
        dz-delivery
        <span className="mr-2 font-medium text-zinc-400">دليل أسعار التوصيل</span>
      </span>
    </Link>
  );
}
