import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fallbackQuiz } from "@/lib/data/quizQuestions";
import type { QuizQuestion } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: (rewardAmmo: number, correct: boolean) => void;
}

export const QuizModal = ({ open, onClose }: Props) => {
  const [q, setQ] = useState<QuizQuestion | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (!open) return;
    setPicked(null);
    setTime(30);
    (async () => {
      const { data } = await supabase.from("quiz_questions").select("*").limit(50);
      const pool = (data && data.length ? data : fallbackQuiz) as QuizQuestion[];
      setQ(pool[Math.floor(Math.random() * pool.length)]);
    })();
  }, [open]);

  useEffect(() => {
    if (!open || picked) return;
    const t = setInterval(() => setTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [open, picked]);

  useEffect(() => {
    if (open && time === 0 && !picked) setPicked("__timeout__");
  }, [time, open, picked]);

  const handleClose = () => {
    if (!q) return onClose(0, false);
    const correct = picked === q.correct;
    onClose(correct ? q.reward_ammo ?? 3 : 0, correct);
  };

  if (!open || !q) return null;
  const opts: Array<["a" | "b" | "c" | "d", string]> = [
    ["a", q.option_a], ["b", q.option_b], ["c", q.option_c], ["d", q.option_d],
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] grid place-items-center bg-brown-dark/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ y: 40, scale: 0.95 }} animate={{ y: 0, scale: 1 }}
          className="bg-card text-foreground rounded-3xl shadow-elegant p-7 max-w-xl w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="label-eyebrow">Kuis Sejarah Aceh</p>
            <span className={cn("text-sm font-mono", time < 10 && "text-destructive")}>{time}s</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden mb-6">
            <div className="h-full bg-gradient-gold transition-all" style={{ width: `${(time / 30) * 100}%` }} />
          </div>

          <h3 className="font-playfair text-xl md:text-2xl font-bold mb-6">{q.question}</h3>

          <div className="grid gap-3 mb-6">
            {opts.map(([key, val]) => {
              const isPicked = picked === key;
              const isCorrect = picked && key === q.correct;
              const isWrong = isPicked && key !== q.correct;
              return (
                <button
                  key={key}
                  disabled={!!picked}
                  onClick={() => setPicked(key)}
                  className={cn(
                    "flex items-center gap-3 text-left p-4 rounded-xl border-2 transition-all",
                    !picked && "border-border hover:border-primary hover:bg-primary/5",
                    isCorrect && "border-emerald-500 bg-emerald-500/10",
                    isWrong && "border-destructive bg-destructive/10",
                    picked && !isPicked && key !== q.correct && "opacity-50",
                  )}
                >
                  <span className={cn(
                    "grid place-items-center h-8 w-8 rounded-full font-cinzel font-bold text-sm shrink-0",
                    isCorrect ? "bg-emerald-500 text-white" : isWrong ? "bg-destructive text-white" : "bg-muted",
                  )}>
                    {isCorrect ? <Check className="h-4 w-4" /> : isWrong ? <X className="h-4 w-4" /> : key.toUpperCase()}
                  </span>
                  <span>{val}</span>
                </button>
              );
            })}
          </div>

          {picked && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {q.explanation && (
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-4">
                  💡 {q.explanation}
                </p>
              )}
              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-xl bg-gradient-gold text-primary-foreground font-cinzel text-sm tracking-[0.2em] uppercase shadow-gold flex items-center justify-center gap-2"
              >
                {picked === q.correct ? (
                  <><Zap className="h-4 w-4" /> Ambil +{q.reward_ammo ?? 3} Amunisi</>
                ) : (
                  "Lanjutkan"
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
