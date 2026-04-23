import { useEffect, useRef, useState, useCallback } from "react";
import { Bell, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fallbackQuiz } from "@/lib/data/quizQuestions";
import type { QuizQuestion } from "@/types";
import { cn } from "@/lib/utils";

interface Bullet { x: number; y: number; vy: number; from: "player" | "enemy"; }
interface Enemy { x: number; y: number; vy: number; w: number; h: number; hp: number; type: "small" | "cannon" | "big"; lastShot?: number; }
interface Star { x: number; y: number; size: number; speed: number; opacity: number; }
interface Cloud { x: number; y: number; width: number; opacity: number; speed: number; color: string; }
interface Explosion { x: number; y: number; frame: number; maxFrames: number; color: string; }
interface FloatText { x: number; y: number; text: string; life: number; }
interface Airdrop { x: number; y: number; vy: number; kind: "heal" | "points"; pulse: number; }

const MAX_AMMO = 10;
const MAX_LIVES = 3;

interface Props { onGameOver: (score: number, correct: number) => void; }

export const PlaneGame = ({ onGameOver }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [ammo, setAmmo] = useState(MAX_AMMO);
  const [lives, setLives] = useState(MAX_LIVES);
  const [wave, setWave] = useState(1);
  const [waveAnnouncement, setWaveAnnouncement] = useState<string | null>("Gelombang Pertama: Invasi Belanda 1873!");
  const [correctCount, setCorrectCount] = useState(0);

  // Quiz in-page state
  const [quizActive, setQuizActive] = useState(false);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const stateRef = useRef({ ammo: MAX_AMMO, lives: MAX_LIVES, paused: false, wave: 1 });

  useEffect(() => {
    stateRef.current.ammo = ammo;
    stateRef.current.lives = lives;
    stateRef.current.paused = quizActive || waveAnnouncement !== null;
    stateRef.current.wave = wave;
  }, [ammo, lives, quizActive, waveAnnouncement, wave]);

  // Wave announcement auto-dismiss
  useEffect(() => {
    if (!waveAnnouncement) return;
    const t = setTimeout(() => setWaveAnnouncement(null), 2200);
    return () => clearTimeout(t);
  }, [waveAnnouncement]);

  // Game over
  useEffect(() => {
    if (lives <= 0) onGameOver(score, correctCount);
  }, [lives]); // eslint-disable-line

  // Auto-trigger quiz on empty ammo
  useEffect(() => {
    if (ammo === 0 && !quizActive && lives > 0) {
      loadQuestion();
    }
  }, [ammo]); // eslint-disable-line

  const loadQuestion = useCallback(async () => {
    setPicked(null);
    const { data } = await supabase.from("quiz_questions").select("*").limit(50);
    const pool = (data && data.length ? data : fallbackQuiz) as QuizQuestion[];
    setQuestion(pool[Math.floor(Math.random() * pool.length)]);
    setQuizActive(true);
  }, []);

  const handleAnswer = (opt: string) => {
    if (picked || !question) return;
    setPicked(opt);
    const correct = opt === question.correct;
    // Apply reward/penalty after a short pause so the user sees the answer feedback
    setTimeout(() => {
      if (correct) {
        setAmmo(MAX_AMMO);
        setCorrectCount((c) => c + 1);
      } else {
        setAmmo(3); // mercy
        setLives((l) => Math.max(0, l - 1));
      }
    }, 2600);
    // Then smoothly fade out the quiz overlay
    setTimeout(() => {
      setQuizActive(false);
      setTimeout(() => setQuestion(null), 500);
    }, 3000);
  };

  // ─────────────── Canvas game loop ───────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.clientWidth;
    const H = () => canvas.clientHeight;

    const player = { x: W() / 2, y: H() - 70, w: 30, h: 36, speed: 3 };
    const bullets: Bullet[] = [];
    const enemies: Enemy[] = [];
    const explosions: Explosion[] = [];
    const floats: FloatText[] = [];
    const airdrops: Airdrop[] = [];
    const keys: Record<string, boolean> = {};

    // Parallax stars
    const stars: Star[] = [];
    for (let i = 0; i < 90; i++) {
      const layer = i % 3;
      stars.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        size: layer === 0 ? 1 : layer === 1 ? 1.5 : 2.5,
        speed: layer === 0 ? 0.4 : layer === 1 ? 1.2 : 2.4,
        opacity: 0.3 + Math.random() * 0.7,
      });
    }

    // Drifting smoke clouds
    const clouds: Cloud[] = [];
    for (let i = 0; i < 6; i++) {
      clouds.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        width: 80 + Math.random() * 140,
        opacity: 0.04 + Math.random() * 0.08,
        speed: 0.3 + Math.random() * 0.5,
        color: i % 2 ? "#4a3728" : "#2a2a3a",
      });
    }

    let lastShot = 0;
    let lastSpawn = 0;
    let waveKills = 0;
    let raf = 0;

    const onKey = (e: KeyboardEvent, down: boolean) => {
      keys[e.key.toLowerCase()] = down;
      if (down && (e.key === " " || e.key === "ArrowUp")) e.preventDefault();
    };
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

    const shoot = () => {
      if (stateRef.current.ammo <= 0) return;
      bullets.push({ x: player.x, y: player.y - 20, vy: -10, from: "player" });
      setAmmo((a) => Math.max(0, a - 1));
    };

    const waveCfg = () => {
      const w = stateRef.current.wave;
      return {
        spawnEvery: Math.max(550, 1500 - w * 180),
        speed: 1.2 + w * 0.4,
        bigChance: w >= 3 ? 0.2 : 0,
        cannonChance: w >= 2 ? 0.25 : 0,
        targetKills: 5 + w * 3,
      };
    };

    const spawnEnemy = () => {
      const cfg = waveCfg();
      const r = Math.random();
      let type: Enemy["type"] = "small";
      if (r < cfg.bigChance) type = "big";
      else if (r < cfg.bigChance + cfg.cannonChance) type = "cannon";
      // Slightly bigger enemies (per user request)
      const w = type === "big" ? 62 : type === "cannon" ? 46 : 38;
      enemies.push({
        x: 30 + Math.random() * (W() - 60),
        y: -30,
        vy: cfg.speed * (type === "big" ? 0.7 : 1),
        w, h: w,
        hp: type === "big" ? 3 : type === "cannon" ? 2 : 1,
        type,
      });

      // ── Airdrop spawn chance ──
      // 10% chance: heart heal airdrop (touch to collect, +1 life)
      // 12% chance: shootable point airdrop (shoot to gain +25 points)
      const ar = Math.random();
      if (ar < 0.10) {
        airdrops.push({
          x: 30 + Math.random() * (W() - 60),
          y: -20,
          vy: 1.2,
          kind: "heal",
          pulse: 0,
        });
      } else if (ar < 0.22) {
        airdrops.push({
          x: 30 + Math.random() * (W() - 60),
          y: -20,
          vy: 1.4,
          kind: "points",
          pulse: 0,
        });
      }
    };

    // ───── Sprites ─────
    const drawPlayerShip = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#C8922A";
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(-15, 14);
      ctx.lineTo(-5, 8);
      ctx.lineTo(0, 12);
      ctx.lineTo(5, 8);
      ctx.lineTo(15, 14);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#FFD66E";
      ctx.beginPath();
      ctx.ellipse(0, -3, 3, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // flame
      const fa = 0.7 + Math.sin(Date.now() * 0.02) * 0.3;
      ctx.fillStyle = `rgba(255,140,0,${fa})`;
      ctx.beginPath();
      ctx.moveTo(-5, 14);
      ctx.lineTo(0, 24 + Math.random() * 4);
      ctx.lineTo(5, 14);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawEnemy = (e: Enemy) => {
      ctx.save();
      ctx.translate(e.x, e.y);
      if (e.type === "big") {
        ctx.fillStyle = "#1a2540";
        ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h);
        ctx.fillStyle = "#C0392B";
        ctx.fillRect(-e.w / 2 + 4, -e.h / 2 + 6, e.w - 8, 4);
        ctx.fillStyle = "#8B1A1A";
        ctx.fillRect(-4, e.h / 2 - 6, 8, 6);
      } else if (e.type === "cannon") {
        ctx.fillStyle = "#555";
        ctx.beginPath();
        ctx.arc(0, 0, e.w / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#888";
        ctx.fillRect(-3, 0, 6, e.h / 2 + 6);
      } else {
        // small enemy plane (red)
        ctx.fillStyle = "#C0392B";
        ctx.beginPath();
        ctx.moveTo(0, e.h / 2);
        ctx.lineTo(-e.w / 2, -e.h / 2 + 4);
        ctx.lineTo(-4, -e.h / 2 + 10);
        ctx.lineTo(0, -e.h / 2 + 6);
        ctx.lineTo(4, -e.h / 2 + 10);
        ctx.lineTo(e.w / 2, -e.h / 2 + 4);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#8B1A1A";
        ctx.beginPath();
        ctx.ellipse(0, 0, 2.5, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const w = W();
      const h = H();

      // ── Background base ──
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h));
      grad.addColorStop(0, "#0f0f2a");
      grad.addColorStop(1, "#0a0a1a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Stars (always animate, even when paused — feels alive)
      for (const s of stars) {
        s.y += s.speed;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      // Clouds
      for (const c of clouds) {
        c.y += c.speed;
        if (c.y > h + 50) { c.y = -100; c.x = Math.random() * w; }
        ctx.fillStyle = c.color;
        ctx.globalAlpha = c.opacity;
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, c.width / 2, c.width / 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Pause: still render player/enemies frozen, skip logic
      if (stateRef.current.paused) {
        for (const e of enemies) drawEnemy(e);
        drawPlayerShip(player.x, player.y);
        return;
      }

      // ── Input ──
      if (keys["arrowleft"] || keys["a"]) player.x -= player.speed;
      if (keys["arrowright"] || keys["d"]) player.x += player.speed;
      if (keys["arrowup"] || keys["w"]) player.y -= player.speed;
      if (keys["arrowdown"] || keys["s"]) player.y += player.speed;
      player.x = Math.max(20, Math.min(w - 20, player.x));
      player.y = Math.max(40, Math.min(h - 30, player.y));

      if ((keys[" "] || keys["arrowup"]) && t - lastShot > 220) { shoot(); lastShot = t; }

      const cfg = waveCfg();
      if (t - lastSpawn > cfg.spawnEvery) { spawnEnemy(); lastSpawn = t; }

      // ── Bullets ──
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.y += b.vy;
        if (b.from === "player") {
          ctx.fillStyle = "#FFD66E";
          ctx.shadowColor = "#FFD66E";
          ctx.shadowBlur = 8;
          ctx.fillRect(b.x - 2, b.y, 4, 12);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "#FF4444";
          ctx.beginPath();
          ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        if (b.y < -20 || b.y > h + 20) bullets.splice(i, 1);
      }

      // ── Enemies ──
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.y += e.vy;
        drawEnemy(e);

        // cannon shoots
        if (e.type === "cannon") {
          if (!e.lastShot) e.lastShot = t;
          if (t - e.lastShot > 1800) {
            bullets.push({ x: e.x, y: e.y + 10, vy: 4, from: "enemy" });
            e.lastShot = t;
          }
        }

        // collide player bullets
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (b.from !== "player") continue;
          if (Math.abs(b.x - e.x) < e.w / 2 && Math.abs(b.y - e.y) < e.h / 2) {
            bullets.splice(j, 1);
            e.hp -= 1;
            if (e.hp <= 0) {
              const pts = e.type === "big" ? 50 : e.type === "cannon" ? 25 : 10;
              setScore((s) => s + pts);
              explosions.push({ x: e.x, y: e.y, frame: 0, maxFrames: 12, color: e.type === "big" ? "#FF4500" : "#C8922A" });
              floats.push({ x: e.x, y: e.y, text: `+${pts}`, life: 40 });
              enemies.splice(i, 1);
              waveKills++;
              if (waveKills >= cfg.targetKills) {
                waveKills = 0;
                const nw = stateRef.current.wave + 1;
                if (nw <= 4) {
                  const names = ["", "Invasi Belanda 1873", "Pertempuran Meulaboh", "Armada Laut Belanda", "Pertempuran Akhir"];
                  setWave(nw);
                  setAmmo(MAX_AMMO);
                  setScore((s) => s + 100);
                  setWaveAnnouncement(`Gelombang ${["", "Pertama", "Kedua", "Ketiga", "Keempat"][nw]}: ${names[nw]}!`);
                }
              }
            }
            break;
          }
        }

        // off screen / hit player
        if (e.y > h + 30) enemies.splice(i, 1);
        else if (Math.abs(e.x - player.x) < (e.w / 2 + 12) && Math.abs(e.y - player.y) < (e.h / 2 + 12)) {
          explosions.push({ x: e.x, y: e.y, frame: 0, maxFrames: 12, color: "#FF4500" });
          enemies.splice(i, 1);
          setLives((l) => Math.max(0, l - 1));
        }
      }

      // enemy bullets vs player
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        if (b.from !== "enemy") continue;
        if (Math.abs(b.x - player.x) < 14 && Math.abs(b.y - player.y) < 16) {
          bullets.splice(i, 1);
          setLives((l) => Math.max(0, l - 1));
        }
      }

      // ── Airdrops ──
      for (let i = airdrops.length - 1; i >= 0; i--) {
        const a = airdrops[i];
        a.y += a.vy;
        a.pulse += 0.12;
        const size = 18;
        const glow = 0.55 + Math.sin(a.pulse) * 0.35;

        // draw parachute
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.fillStyle = a.kind === "heal" ? `rgba(255,90,110,${glow})` : `rgba(255,215,110,${glow})`;
        ctx.beginPath();
        ctx.arc(0, -size, size, Math.PI, 0);
        ctx.fill();
        // strings
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-size + 2, -size); ctx.lineTo(-6, 2);
        ctx.moveTo(size - 2, -size); ctx.lineTo(6, 2);
        ctx.stroke();
        // crate
        ctx.fillStyle = a.kind === "heal" ? "#7a1f2a" : "#3a2a10";
        ctx.fillRect(-size / 2, 0, size, size);
        ctx.strokeStyle = a.kind === "heal" ? "#ff5a6e" : "#FFD66E";
        ctx.lineWidth = 2;
        ctx.strokeRect(-size / 2, 0, size, size);
        // icon
        ctx.fillStyle = a.kind === "heal" ? "#ffd2d6" : "#fff7d6";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(a.kind === "heal" ? "♥" : "$", 0, size / 2 + 1);
        ctx.restore();

        // shootable points airdrop: bullet collision
        if (a.kind === "points") {
          for (let j = bullets.length - 1; j >= 0; j--) {
            const b = bullets[j];
            if (b.from !== "player") continue;
            if (Math.abs(b.x - a.x) < size && Math.abs(b.y - (a.y + size / 2)) < size + 4) {
              bullets.splice(j, 1);
              airdrops.splice(i, 1);
              setScore((s) => s + 25);
              explosions.push({ x: a.x, y: a.y, frame: 0, maxFrames: 12, color: "#FFD66E" });
              floats.push({ x: a.x, y: a.y, text: "+25", life: 50 });
              break;
            }
          }
        }

        // heal airdrop: collect on player touch
        if (a.kind === "heal" && airdrops[i] === a) {
          if (Math.abs(a.x - player.x) < 22 && Math.abs((a.y + size / 2) - player.y) < 24) {
            airdrops.splice(i, 1);
            setLives((l) => Math.min(MAX_LIVES, l + 1));
            explosions.push({ x: a.x, y: a.y, frame: 0, maxFrames: 12, color: "#ff5a6e" });
            floats.push({ x: a.x, y: a.y, text: "+1 ♥", life: 55 });
            continue;
          }
        }

        // off screen
        if (airdrops[i] === a && a.y > h + 40) airdrops.splice(i, 1);
      }

      // explosions
      for (let i = explosions.length - 1; i >= 0; i--) {
        const ex = explosions[i];
        ex.frame++;
        const r = (ex.frame / ex.maxFrames) * 30;
        ctx.strokeStyle = ex.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 1 - ex.frame / ex.maxFrames;
        ctx.beginPath();
        ctx.arc(ex.x, ex.y, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        if (ex.frame >= ex.maxFrames) explosions.splice(i, 1);
      }

      // floats
      for (let i = floats.length - 1; i >= 0; i--) {
        const f = floats[i];
        f.y -= 1;
        f.life--;
        ctx.fillStyle = `rgba(255, 215, 110, ${f.life / 40})`;
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.fillText(f.text, f.x, f.y);
        if (f.life <= 0) floats.splice(i, 1);
      }

      drawPlayerShip(player.x, player.y);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full">
      {/* HUD — 4 boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="border border-gray-700 rounded-lg p-3 bg-[#1a1a1a] text-center">
          <div className="text-[0.6rem] text-gray-400 tracking-widest mb-1">SKOR</div>
          <div className="text-2xl font-bold text-white font-mono">{score}</div>
        </div>
        <div className="border border-gray-700 rounded-lg p-3 bg-[#1a1a1a] text-center">
          <div className="text-[0.6rem] text-gray-400 tracking-widest mb-2">AMMO</div>
          <div className="flex gap-1 justify-center flex-wrap">
            {Array.from({ length: MAX_AMMO }).map((_, i) => (
              <div key={i} className={cn("w-3 h-4 rounded-sm", i < ammo ? "bg-[#C8922A]" : "bg-gray-700")} />
            ))}
          </div>
        </div>
        <div className="border border-gray-700 rounded-lg p-3 bg-[#1a1a1a] text-center">
          <div className="text-[0.6rem] text-gray-400 tracking-widest mb-2">NYAWA</div>
          <div className="flex gap-2 justify-center text-xl">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span key={i} className={i < lives ? "text-red-500" : "text-gray-600"}>♥</span>
            ))}
          </div>
        </div>
        <div className="border border-gray-700 rounded-lg p-3 bg-[#1a1a1a] text-center">
          <div className="text-[0.6rem] text-gray-400 tracking-widest mb-1">WAVE</div>
          <div className="text-2xl font-bold text-white font-mono">{wave}</div>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full aspect-[16/9] rounded-lg border border-gray-800 bg-[#0a0a1a]"
          tabIndex={0}
        />
        {waveAnnouncement && (
          <div className="absolute inset-0 grid place-items-center pointer-events-none transition-opacity duration-500">
            <div className="bg-black/60 px-8 py-4 rounded-xl border border-[#C8922A]">
              <p className="font-cinzel text-[#FFD66E] text-lg md:text-2xl tracking-widest text-center"
                 style={{ textShadow: "0 0 20px rgba(200,146,42,0.6)" }}>
                {waveAnnouncement}
              </p>
            </div>
          </div>
        )}

        {/* In-canvas Quiz overlay with fade transition */}
        {question && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center p-4 md:p-6 transition-all duration-500 ease-out",
              quizActive ? "opacity-100 backdrop-blur-sm" : "opacity-0 pointer-events-none"
            )}
            style={{ background: "rgba(10,10,26,0.78)" }}
          >
            <div
              className={cn(
                "w-full max-w-2xl bg-[#0a0a1a]/95 border border-[#C8922A]/40 rounded-xl p-5 md:p-6 shadow-2xl transition-all duration-500 ease-out",
                quizActive ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-2 opacity-0"
              )}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#2a1f0a] border border-[#C8922A] rounded-full px-4 py-1.5 flex items-center gap-2">
                  <Bell className="h-3.5 w-3.5 text-[#C8922A]" />
                  <span className="text-white text-xs">Ammo Habis! Jawab Kuis untuk Lanjut</span>
                </div>
              </div>
              <hr className="border-gray-700 mb-4" />
              <h3 className="text-white text-base md:text-lg text-center font-medium mb-5">{question.question}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(["a", "b", "c", "d"] as const).map((opt) => {
                  const val = question[`option_${opt}` as keyof QuizQuestion] as string;
                  const isPicked = picked === opt;
                  const isCorrectOpt = picked && opt === question.correct;
                  const isWrongOpt = isPicked && opt !== question.correct;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      disabled={!!picked}
                      className={cn(
                        "border rounded-lg p-3 text-left bg-[#1a1a1a] text-white text-sm transition-all duration-300",
                        !picked && "border-gray-600 hover:border-[#C8922A] hover:bg-[#1a1500]",
                        isCorrectOpt && "border-green-500 bg-green-900/30 scale-[1.02]",
                        isWrongOpt && "border-red-500 bg-red-900/30",
                      )}
                    >
                      <span className="text-[#C8922A] font-bold mr-2">{opt.toUpperCase()}.</span>
                      {val}
                      {isCorrectOpt && <Check className="inline h-4 w-4 ml-2 text-green-400" />}
                      {isWrongOpt && <X className="inline h-4 w-4 ml-2 text-red-400" />}
                    </button>
                  );
                })}
              </div>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-out",
                  picked ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                )}
              >
                {picked && (
                  <div
                    className={cn(
                      "p-3 rounded-lg text-center text-sm",
                      picked === question.correct ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400",
                    )}
                  >
                    {picked === question.correct
                      ? `✓ Benar! Ammo direfill penuh`
                      : "✗ Salah. Nyawa berkurang, ammo darurat diberi."}
                    {question.explanation && (
                      <p className="text-gray-400 text-xs mt-1">{question.explanation}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <p className="text-center text-xs text-gray-400 mt-3">
        ← → / A D untuk bergerak  |  SPASI / ↑ untuk menembak  |  ♥ Airdrop merah = nyawa (sentuh)  |  $ Airdrop emas = +25 (tembak)
      </p>
    </div>
  );
};