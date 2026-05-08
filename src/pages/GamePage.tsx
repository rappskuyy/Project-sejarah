import { useEffect, useState } from "react";
import { Trophy, Plane, RotateCcw } from "lucide-react";
import { PlaneGame } from "@/components/game/PlaneGame";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MissionTimer } from "@/components/home/MissionTimer";

interface ScoreRow { id: string; player_name: string; score: number; quiz_correct: number; created_at: string; }

const GamePage = () => {
  const [name, setName] = useState("");
  const [stage, setStage] = useState<"menu" | "play" | "over">("menu");
  const [final, setFinal] = useState({ score: 0, correct: 0 });
  const [board, setBoard] = useState<ScoreRow[]>([]);

  useEffect(() => { document.title = "Game Pesawat — Pahlawan Aceh"; }, []);

  const loadBoard = async () => {
    const { data } = await supabase.from("game_scores").select("*").order("score", { ascending: false }).limit(10);
    if (data) setBoard(data as ScoreRow[]);
  };
  useEffect(() => { loadBoard(); }, []);

  const start = () => {
    if (!name.trim()) { toast({ title: "Masukkan nama dulu" }); return; }
    setStage("play");
  };

  const handleOver = async (score: number, correct: number) => {
    setFinal({ score, correct });
    setStage("over");
    const { error } = await supabase.from("game_scores").insert({ player_name: name.slice(0, 30), score, quiz_correct: correct });
    if (!error) loadBoard();
  };

  return (
    <div className="pt-28 pb-20 bg-background min-h-screen">
      <MissionTimer missionKey="game" missionLabel="Fakta Cepat & Game" />

      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="label-eyebrow mb-3">Mainkan & Pelajari</p>
          <h1 className="heading-display text-4xl md:text-6xl mb-4">
            Pertahanan <span className="italic text-gradient-gold">Langit Aceh</span>
          </h1>
          <p className="text-muted-foreground">
            Tembak pesawat penjajah. Saat amunisi habis, jawab kuis sejarah untuk
            mengisi ulang amunisi!
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start max-w-6xl mx-auto">
          <div>
            {stage === "menu" && (
              <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-card">
                <Plane className="h-12 w-12 mx-auto text-primary mb-4" />
                <h2 className="font-playfair text-2xl font-bold mb-3">Siap terbang?</h2>
                <p className="text-muted-foreground text-sm mb-6">Masukkan nama pemain Anda untuk memulai.</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={30}
                  placeholder="Nama pemain"
                  className="w-full max-w-sm mx-auto block px-4 py-3 rounded-xl border border-border bg-background mb-4 text-center"
                />
                <button onClick={start} className="px-7 py-3.5 rounded-full bg-gradient-gold text-primary-foreground font-cinzel text-sm tracking-[0.2em] uppercase shadow-gold hover:scale-105 transition-transform">
                  Mulai Misi
                </button>
              </div>
            )}

            {stage === "play" && <PlaneGame onGameOver={handleOver} />}

            {stage === "over" && (
              <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-elegant">
                <Trophy className="h-14 w-14 mx-auto text-gold mb-4" />
                <h2 className="font-playfair text-3xl font-bold mb-2">Game Selesai</h2>
                <p className="text-muted-foreground mb-6">Selamat berjuang, {name}!</p>
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
                  <div className="bg-muted/50 p-4 rounded-xl">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Skor</p>
                    <p className="font-playfair text-3xl font-bold text-gradient-gold">{final.score}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Kuis Benar</p>
                    <p className="font-playfair text-3xl font-bold text-gradient-gold">{final.correct}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setStage("menu"); setFinal({ score: 0, correct: 0 }); }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground font-cinzel text-sm tracking-[0.2em] uppercase shadow-gold"
                >
                  <RotateCcw className="h-4 w-4" /> Main Lagi
                </button>
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <aside className="bg-brown-dark text-cream rounded-2xl p-6 shadow-elegant sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <Trophy className="h-5 w-5 text-gold-light" />
              <h3 className="font-cinzel text-sm tracking-[0.25em] uppercase">Papan Skor</h3>
            </div>
            {board.length === 0 ? (
              <p className="text-cream/60 text-sm">Belum ada skor — jadilah yang pertama!</p>
            ) : (
              <ol className="space-y-2">
                {board.map((s, i) => (
                  <li key={s.id} className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-brown-medium/40 text-sm">
                    <span className="flex items-center gap-2">
                      <span className={`w-6 text-center font-cinzel ${i < 3 ? "text-gold-light" : "text-cream/50"}`}>{i + 1}</span>
                      <span className="font-medium truncate max-w-[120px]">{s.player_name}</span>
                    </span>
                    <span className="font-mono text-gold-light">{s.score}</span>
                  </li>
                ))}
              </ol>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default GamePage;