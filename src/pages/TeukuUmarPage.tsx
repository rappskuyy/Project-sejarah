import { useEffect } from "react";
import { teukuUmarData as hero } from "@/lib/data/teukuUmar";
import { BiographyHero } from "@/components/biography/BiographyHero";
import { AboutSection } from "@/components/biography/AboutSection";
import { TimelineSection } from "@/components/biography/TimelineSection";
import { QuoteStatsSection } from "@/components/biography/QuoteStatsSection";
import { FactsSection } from "@/components/biography/FactsSection";
import { LegacySection } from "@/components/biography/LegacySection";
import { StrategySection } from "@/components/biography/StrategySection";
import { GallerySection } from "@/components/biography/GallerySection";
import { CtaSection } from "@/components/biography/CtaSection";
import { ColonialDocuments } from "../components/biography/ColonialDocuments";
import { WarMap } from "@/components/biography/WarMap";
import { MissionTimer } from "@/components/home/MissionTimer";

const TeukuUmarPage = () => {
  useEffect(() => {
    document.title = `${hero.name} — Pahlawan Aceh`;
  }, []);

  return (
    <>
      <MissionTimer missionKey="peta" missionLabel="Peta Wilayah Aceh" />
      <BiographyHero hero={hero} />
      <AboutSection hero={hero} />
      <TimelineSection hero={hero} />
      <QuoteStatsSection hero={hero} />
      <FactsSection hero={hero} />
      <ColonialDocuments />
      <WarMap />
      <LegacySection hero={hero} />
      <StrategySection hero={hero} />
      <GallerySection hero={hero} />
      <CtaSection hero={hero} />
    </>
  );
};

export default TeukuUmarPage;