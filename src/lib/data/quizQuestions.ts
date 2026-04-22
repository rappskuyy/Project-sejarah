import type { QuizQuestion } from "@/types";

// Fallback questions when Supabase is unreachable
export const fallbackQuiz: QuizQuestion[] = [
  {
    id: "fallback-1",
    hero: "cut-nyak-dien",
    question: "Di mana Cut Nyak Dien dilahirkan?",
    option_a: "Meulaboh",
    option_b: "Lampadang, Aceh Besar",
    option_c: "Banda Aceh",
    option_d: "Sumedang",
    correct: "b",
    explanation: "Cut Nyak Dien lahir di Lampadang, Aceh Besar pada tahun 1848.",
    difficulty: "easy",
    reward_ammo: 3,
  },
  {
    id: "fallback-2",
    hero: "teuku-umar",
    question: "Strategi terkenal Teuku Umar adalah?",
    option_a: "Perang frontal",
    option_b: "Pura-pura menyerah ke Belanda",
    option_c: "Negosiasi damai",
    option_d: "Mundur ke gunung",
    correct: "b",
    explanation: "Teuku Umar berpura-pura menyerah untuk mendapatkan senjata Belanda.",
    difficulty: "medium",
    reward_ammo: 3,
  },
  {
    id: "fallback-3",
    hero: "general",
    question: "Perang Aceh berlangsung selama berapa tahun?",
    option_a: "10 tahun",
    option_b: "20 tahun",
    option_c: "26 tahun",
    option_d: "30 tahun",
    correct: "c",
    explanation: "Perang Aceh berlangsung sekitar 26 tahun (1873-1904).",
    difficulty: "medium",
    reward_ammo: 3,
  },
];
