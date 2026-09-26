import { carriers } from "@/lib/carriers";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import CarrierCards from "@/components/CarrierCards";
import ServiceBand from "@/components/ServiceBand";
import HowSteps from "@/components/HowSteps";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  const list = carriers.filter((c) => c.id === "redex" || c.id === "anderson");

  return (
    <main className="bg-stone-50 text-zinc-900">
      <SiteHeader />
      <Hero />
      <CarrierCards carriers={list} />
      <ServiceBand />
      <HowSteps />
      <SiteFooter />
    </main>
  );
}
