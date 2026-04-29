import { HeroSection } from "@/components/home/HeroSection";
import { HeroCardsSection } from "@/components/home/HeroCardsSection";
import { QuoteSection } from "@/components/home/QuoteSection";
import { GameLeaderboardSection } from "@/components/home/GameLeaderboardSection";
import { LearningMuseumSection } from "@/components/home/LearningMuseumSection";

const Home = () => (
  <>
    <HeroSection />
    <HeroCardsSection />
    <LearningMuseumSection />
    <QuoteSection />
    <GameLeaderboardSection />
  </>
);

export default Home;
