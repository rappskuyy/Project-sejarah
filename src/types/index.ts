export type ColorTheme = "gold" | "maroon";

export interface Stat { label: string; value: number; }
export interface UniqueFact { icon: string; title: string; desc: string; }
export interface TimelineEvent {
  year: number;
  side: "left" | "right";
  title: string;
  desc: string;
}
export interface LegacyItem {
  icon: string;
  category: string;
  title: string;
  desc: string;
}
export interface Strategy { title: string; desc: string; effectiveness: number; }
export interface GalleryItem { title: string; category: string; image: string; }
export interface HeroStat { value: string; label: string; }

export interface HeroData {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  birthYear: number;
  deathYear: number;
  birthPlace: string;
  fightingStyle: string;
  mainWeapon: string;
  quote: string;
  colorTheme: ColorTheme;
  portrait: string;
  heroBg: string;
  stats: Stat[];
  shortBio: string;
  longBio: string[];
  uniqueFacts: UniqueFact[];
  timeline: TimelineEvent[];
  legacy: LegacyItem[];
  strategies: Strategy[];
  gallery: GalleryItem[];
  heroStats: HeroStat[];
}

export interface QuizQuestion {
  id: string;
  hero: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct: "a" | "b" | "c" | "d";
  explanation: string | null;
  reward_ammo: number | null;
}

export interface GameScore {
  id: string;
  player_name: string;
  score: number;
  quiz_correct: number;
  created_at: string;
}
