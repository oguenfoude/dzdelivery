"use client";

import { useEffect, useState } from "react";
import type { Carrier } from "@/lib/carriers";

/** Logo <img> with automatic fallback to the SVG placeholder if the PNG is missing. */
export default function CarrierLogo({
  carrier,
  eager = false,
}: {
  carrier: Carrier;
  eager?: boolean;
}) {
  const fallback = carrier.logoFallback ?? carrier.logo ?? "";
  const [src, setSrc] = useState(carrier.logo ?? fallback);
  useEffect(() => {
    setSrc(carrier.logo ?? fallback);
  }, [carrier.id, carrier.logo, fallback]);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
      alt={`شعار ${carrier.nameAr || carrier.name}`}
      className="h-10 w-auto max-w-full object-contain md:h-12"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
