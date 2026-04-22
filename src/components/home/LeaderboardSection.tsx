import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Medal, Award, Plane, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Score {
  id: string;
  player_name: string;
  score: number;
  quiz_correct: number;
  created_at: string;
}

interface LBProps { embedded?: boolean }

export const LeaderboardSection = ({ embedded = false }: LBProps = {}) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("game_scores")
        .select("*")
        .order("score", { ascending: false })
        .limit(10);
      setScores(data ?? []);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel("scores")
      .on("postgres_changes", { event: "*", schema: "public", table: "game_scores" }, load)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const rankIcon = (i: number) => {
    if (i === 0) return <Crown className="h-5 w-5 text-gold-light" />;
    if (i === 1) return <Medal className="h-5 w-5 text-cream/80" />;
    if (i === 2) return <Award className="h-5 w-5 text-maroon-light" />;
    return <span className="font-mono text-sm text-cream/50">{i + 1}</span>;
  };

  const inner = (
    <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn("mb-8", embedded ? "text-left" : "text-center mb-12")}
        >
          <p className="label-eyebrow mb-3">Papan Skor Tertinggi</p>
          <h2 className={cn("heading-display mb-3", embedded ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl mb-4")}>
            <span className="italic text-gradient-gold">Leaderboard</span> Pahlawan
          </h2>
          <p className={cn("text-muted-foreground", embedded ? "text-sm" : "text-lg max-w-2xl mx-auto")}>
            Para penjaga langit Aceh dengan skor tertinggi. Mainkan game dan jawab kuis
            sejarah untuk masuk papan ini!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden bg-brown-dark text-cream shadow-elegant"
        >
          <div className="grid grid-cols-12 gap-2 px-6 py-4 border-b border-cream/10 font-cinzel text-xs tracking-[0.2em] uppercase text-cream/60">
            <div className="col-span-2">Rank</div>
            <div className="col-span-5">Pemain</div>
            <div className="col-span-3 text-center">Kuis Benar</div>
            <div className="col-span-2 text-right">Skor</div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-cream/50 font-cinzel text-sm tracking-widest uppercase">
              Memuat...
            </div>
          ) : scores.length === 0 ? (
            <div className="p-12 text-center">
              <Trophy className="h-10 w-10 text-gold-light/50 mx-auto mb-3" />
              <p className="text-cream/70 mb-1">Belum ada skor tercatat</p>
              <p className="text-cream/50 text-sm">Jadilah yang pertama!</p>
            </div>
          ) : (
            scores.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "grid grid-cols-12 gap-2 px-6 py-4 items-center text-sm md:text-base border-b border-cream/5 last:border-0",
                  i === 0 && "bg-gradient-to-r from-gold/20 via-transparent to-transparent",
                  i === 1 && "bg-cream/5",
                  i === 2 && "bg-maroon/10",
                )}
              >
                <div className="col-span-2 flex items-center">{rankIcon(i)}</div>
                <div className="col-span-5 font-medium truncate">{s.player_name}</div>
                <div className="col-span-3 text-center font-mono text-gold-light">
                  {s.quiz_correct}
                </div>
                <div className="col-span-2 text-right font-mono font-bold text-gold-light">
                  {s.score.toLocaleString()}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {!embedded && (
        <div className="text-center mt-10">
          <Link
            to="/game"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-maroon text-secondary-foreground font-cinzel text-sm tracking-[0.2em] uppercase shadow-maroon hover:scale-105 transition-transform"
          >
            <Plane className="h-4 w-4" /> Mulai Bermain
          </Link>
        </div>
        )}
    </>
  );

  if (embedded) return inner;

  return (
    <section className="py-24 md:py-32 bg-cream-dark">
      <div className="container max-w-4xl">
        {inner}
      </div>
    </section>
  );
};
