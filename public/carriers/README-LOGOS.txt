dz-delivery — carrier logos
===========================

INSTALLED real logos:
  public/carriers/redex.webp    <- RedEx official logo (red Red + black Ex + arrow, transparent)
  public/carriers/anderson.png  <- Anderson (red أندرسون + yellow highlight, 600x65)

Fallback SVG placeholders (kept, used automatically if a PNG is missing):
  public/carriers/redex.svg
  public/carriers/anderson.svg

How it works:
- lib/carriers.ts points `logo` at the .png files above.
- CarrierLogo <img> falls back to the .svg placeholder on error,
  so NO code change is needed if you replace the PNGs later.
- NOTE: real logos are wide banners on light backgrounds — always show
  them on WHITE/light tiles, never on dark tiles.
