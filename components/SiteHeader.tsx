import SiteBrand from "./SiteBrand";

export default function SiteHeader() {
  return (
    <div className="border-b border-zinc-200/70">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2.5 px-4 py-3">
        <SiteBrand />
      </div>
    </div>
  );
}
