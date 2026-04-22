import { useEffect, useRef, useState } from "react";
import { Heart, Plane, Zap } from "lucide-react";
import { QuizModal } from "./QuizModal";
import { cn } from "@/lib/utils";

interface Bullet { x: number; y: number; vy: number; }
interface Enemy { x: number; y: number; vx: number; w: number; h: number; }

interface Props { onGameOver: (score: number, correct: number) => void; }

export const PlaneGame = ({ onGameOver }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [ammo, setAmmo] = useState(30);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [quizOpen, setQuizOpen] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const stateRef = useRef({ ammo: 30, lives: 3, score: 0, paused: false });

  useEffect(() => {
    stateRef.current.ammo = ammo;
    stateRef.current.lives = lives;
    stateRef.current.score = score;
    stateRef.current.paused = paused || quizOpen;
  }, [ammo, lives, score, paused, quizOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width = canvas.clientWidth;
    const H = canvas.height = canvas.clientHeight;

    const player = { x: W / 2, y: H - 80, w: 50, h: 40, speed: 5 };
    const bullets: Bullet[] = [];
    const enemies: Enemy[] = [];
    const keys: Record<string, boolean> = {};
    let lastShot = 0;
    let lastSpawn = 0;
    let raf = 0;

    const onKey = (e: KeyboardEvent, down: boolean) => {
      keys[e.key.toLowerCase()] = down;
      if (down && e.key === " ") e.preventDefault();
    };
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

    const shoot = () => {
      if (stateRef.current.ammo <= 0) return;
      bullets.push({ x: player.x, y: player.y - 20, vy: -9 });
      setAmmo((a) => Math.max(0, a - 1));
    };

    const spawnEnemy = () => {
      enemies.push({
        x: W + 30,
        y: 60 + Math.random() * (H - 200),
        vx: -(2 + Math.random() * 1.5 + level * 0.4),
        w: 44, h: 32,
      });
    };

    const drawPlane = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -h / 2);
      ctx.lineTo(w / 2, h / 2);
      ctx.lineTo(0, h / 4);
      ctx.lineTo(-w / 2, h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillRect(-3, -h / 4, 6, 10);
      ctx.restore();
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (stateRef.current.paused) return;

      // bg
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#1a0d08");
      grad.addColorStop(0.5, "#3d1a0d");
      grad.addColorStop(1, "#8b3a0e");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // stars
      for (let i = 0; i < 30; i++) {
        const sx = (i * 137 + (t * 0.05) % W) % W;
        const sy = (i * 53) % (H - 100);
        ctx.fillStyle = "rgba(255,220,150,0.4)";
        ctx.fillRect(sx, sy, 2, 2);
      }

      // input
      if (keys["arrowleft"] || keys["a"]) player.x -= player.speed;
      if (keys["arrowright"] || keys["d"]) player.x += player.speed;
      if (keys["arrowup"] || keys["w"]) player.y -= player.speed;
      if (keys["arrowdown"] || keys["s"]) player.y += player.speed;
      player.x = Math.max(30, Math.min(W - 30, player.x));
      player.y = Math.max(30, Math.min(H - 30, player.y));

      if (keys[" "] && t - lastShot > 220) { shoot(); lastShot = t; }
      if (t - lastSpawn > Math.max(500, 1400 - level * 100)) { spawnEnemy(); lastSpawn = t; }

      // bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.y += b.vy;
        ctx.fillStyle = "#FFD66E";
        ctx.fillRect(b.x - 2, b.y, 4, 12);
        if (b.y < 0) bullets.splice(i, 1);
      }

      // enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.x += e.vx;
        drawPlane(e.x, e.y, e.w, e.h, "#A02020");
        // collide bullets
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (Math.abs(b.x - e.x) < e.w / 2 && Math.abs(b.y - e.y) < e.h / 2) {
            enemies.splice(i, 1);
            bullets.splice(j, 1);
            setScore((s) => s + 100);
            break;
          }
        }
        if (e.x < -50) {
          enemies.splice(i, 1);
          setLives((l) => l - 1);
        } else if (Math.abs(e.x - player.x) < 35 && Math.abs(e.y - player.y) < 30) {
          enemies.splice(i, 1);
          setLives((l) => l - 1);
        }
      }

      // player
      drawPlane(player.x, player.y, player.w, player.h, "#E8B84B");

      // ammo empty -> open quiz
      if (stateRef.current.ammo === 0 && !stateRef.current.paused) {
        setQuizOpen(true);
      }
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, [level]);

  // Level up every 1000 score
  useEffect(() => {
    setLevel(Math.floor(score / 1000) + 1);
  }, [score]);

  // Game over
  useEffect(() => {
    if (lives <= 0) onGameOver(score, correctCount);
  }, [lives]); // eslint-disable-line

  const handleQuizClose = (reward: number, correct: boolean) => {
    setQuizOpen(false);
    if (reward > 0) setAmmo((a) => a + reward);
    if (correct) setCorrectCount((c) => c + 1);
    if (reward === 0) setAmmo(3); // mercy
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* HUD */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center gap-3 text-cream font-cinzel text-xs tracking-widest uppercase">
        <div className="flex items-center gap-2 bg-brown-dark/70 backdrop-blur px-3 py-2 rounded-full">
          <Plane className="h-4 w-4 text-gold-light" />
          <span>Skor: <b className="text-gold-light font-mono">{score}</b></span>
        </div>
        <div className="flex items-center gap-2 bg-brown-dark/70 backdrop-blur px-3 py-2 rounded-full">
          <span>Lvl <b className="text-gold-light font-mono">{level}</b></span>
        </div>
        <div className="flex items-center gap-2 bg-brown-dark/70 backdrop-blur px-3 py-2 rounded-full min-w-[140px]">
          <Zap className="h-4 w-4 text-gold-light" />
          <div className="flex-1 h-1.5 bg-cream/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-gold transition-all" style={{ width: `${Math.min(100, (ammo / 30) * 100)}%` }} />
          </div>
          <span className="font-mono">{ammo}</span>
        </div>
        <div className="flex items-center gap-1 bg-brown-dark/70 backdrop-blur px-3 py-2 rounded-full ml-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart key={i} className={cn("h-4 w-4", i < lives ? "text-maroon-light fill-current" : "text-cream/30")} />
          ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full aspect-[16/10] rounded-2xl shadow-elegant bg-brown-dark"
        tabIndex={0}
      />

      <p className="text-center text-xs text-muted-foreground mt-3">
        Kontrol: <kbd className="px-1.5 py-0.5 bg-muted rounded">WASD</kbd> / <kbd className="px-1.5 py-0.5 bg-muted rounded">Panah</kbd> bergerak ·
        <kbd className="px-1.5 py-0.5 bg-muted rounded ml-1">Spasi</kbd> tembak
      </p>

      <QuizModal open={quizOpen} onClose={handleQuizClose} />
    </div>
  );
};
