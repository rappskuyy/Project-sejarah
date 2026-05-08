import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, BookOpen } from "lucide-react";
import { useMissionTimer, REQUIRED_SECONDS, type MissionKey } from "@/hooks/useMissionProgress";

interface Props {
  missionKey: MissionKey;
  missionLabel: string;
}

export function MissionTimer({ missionKey, missionLabel }: Props) {
  const { isCompleted, timeSpent, remaining } = useMissionTimer(missionKey);
  const [localRemaining, setLocalRemaining] = useState(remaining);
  const [justCompleted, setJustCompleted] = useState(false);

  // Live countdown using local state
  useEffect(() => {
    if (isCompleted) return;
    setLocalRemaining(remaining);
    const interval = setInterval(() => {
      setLocalRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setJustCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted, remaining]);

  const progress = Math.min(1, timeSpent / REQUIRED_SECONDS);
  const circumference = 2 * Math.PI * 22;
  const dashOffset = circumference * (1 - progress);

  const minutes = Math.floor(localRemaining / 60);
  const seconds = localRemaining % 60;

  if (isCompleted || justCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-gold/40 bg-brown-dark px-5 py-4 shadow-elegant"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
          <CheckCircle2 className="h-5 w-5 text-gold-light" />
        </div>
        <div>
          <p className="font-cinzel text-[0.65rem] tracking-[0.25em] uppercase text-gold-light">Misi Selesai!</p>
          <p className="text-sm font-medium text-cream">{missionLabel}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-4 rounded-2xl border border-cream/10 bg-brown-dark/95 px-5 py-4 shadow-elegant backdrop-blur-xl"
    >
      {/* Circular progress */}
      <div className="relative h-12 w-12 shrink-0">
        <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,214,130,0.12)" strokeWidth="3" />
          <circle
            cx="24" cy="24" r="22"
            fill="none"
            stroke="rgb(255,214,130)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className="h-4 w-4 text-gold-light" />
        </div>
      </div>

      <div>
        <p className="font-cinzel text-[0.6rem] tracking-[0.25em] uppercase text-gold-light mb-0.5">Waktu Baca</p>
        <p className="font-mono text-lg font-bold text-cream leading-none">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </p>
        <p className="text-[0.65rem] text-cream/50 mt-0.5">tersisa untuk misi ini</p>
      </div>

      <div className="flex items-center gap-1.5 rounded-lg border border-cream/10 bg-cream/5 px-2.5 py-1.5">
        <BookOpen className="h-3.5 w-3.5 text-cream/40" />
        <p className="text-[0.65rem] text-cream/50">Terus baca</p>
      </div>
    </motion.div>
  );
}