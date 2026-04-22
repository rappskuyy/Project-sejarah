import { useEffect } from "react";
import { cutNyakDienData as hero } from "@/lib/data/cutNyakDien";
import { BiographyHero } from "@/components/biography/BiographyHero";
import { AboutSection } from "@/components/biography/AboutSection";
import { TimelineSection } from "@/components/biography/TimelineSection";
import { QuoteStatsSection } from "@/components/biography/QuoteStatsSection";
import { FactsSection } from "@/components/biography/FactsSection";
import { LegacySection } from "@/components/biography/LegacySection";
import { StrategySection } from "@/components/biography/StrategySection";
import { GallerySection } from "@/components/biography/GallerySection";
import { CtaSection } from "@/components/biography/CtaSection";

const CutNyakDienPage = () => {
  useEffect(() => {
    document.title = `${hero.name} — Pahlawan Aceh`;
  }, []);
  return (
    <>
      <BiographyHero hero={hero} />
      <AboutSection hero={hero} />
      <TimelineSection hero={hero} />
      <QuoteStatsSection hero={hero} />
      <FactsSection hero={hero} />
      <LegacySection hero={hero} />
      <StrategySection hero={hero} />
      <GallerySection hero={hero} />
      <CtaSection hero={hero} />
    </>
  );
};
export default CutNyakDienPage;
