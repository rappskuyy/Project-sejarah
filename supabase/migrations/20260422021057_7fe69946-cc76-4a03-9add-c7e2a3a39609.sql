
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero TEXT NOT NULL DEFAULT 'general',
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct TEXT NOT NULL CHECK (correct IN ('a','b','c','d')),
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium',
  reward_ammo INT DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quiz questions"
  ON public.quiz_questions FOR SELECT
  USING (true);

CREATE TABLE public.game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL,
  score INT NOT NULL,
  quiz_correct INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read leaderboard"
  ON public.game_scores FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit a score"
  ON public.game_scores FOR INSERT
  WITH CHECK (
    char_length(player_name) BETWEEN 1 AND 30
    AND score >= 0
    AND quiz_correct >= 0
  );

CREATE INDEX idx_game_scores_score ON public.game_scores (score DESC);
CREATE INDEX idx_quiz_questions_hero ON public.quiz_questions (hero);
