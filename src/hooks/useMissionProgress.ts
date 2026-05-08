import { useEffect, useRef, useCallback } from "react";

export type MissionKey = "biografi" | "strategi" | "peta" | "game";

export interface MissionProgress {
  completed: boolean;
  timeSpent: number; // seconds
  completedAt?: string; // ISO date string
}

export interface AllProgress {
  missions: Record<MissionKey, MissionProgress>;
  certificateClaimed: boolean;
  claimedAt?: string;
}

const STORAGE_KEY = "pahlawan_aceh_mission_progress";
export const REQUIRED_SECONDS = 120; // 2 minutes

export const MISSION_ROUTES: Record<MissionKey, string> = {
  biografi: "/cut-nyak-dien",
  strategi: "/perbandingan",
  peta: "/teuku-umar",
  game: "/game",
};

export const MISSION_LABELS: Record<MissionKey, string> = {
  biografi: "Telusuri peta Aceh",
  strategi: "Klik timeline sejarah",
  peta: "Baca materi cepat",
  game: "Uji pemahaman di game",
};

const defaultProgress = (): AllProgress => ({
  missions: {
    biografi: { completed: false, timeSpent: 0 },
    strategi: { completed: false, timeSpent: 0 },
    peta: { completed: false, timeSpent: 0 },
    game: { completed: false, timeSpent: 0 },
  },
  certificateClaimed: false,
});

export function loadProgress(): AllProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as AllProgress;
    // ensure all keys exist
    const def = defaultProgress();
    return {
      ...def,
      ...parsed,
      missions: { ...def.missions, ...parsed.missions },
    };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: AllProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage unavailable
  }
}

export function getRouteKey(pathname: string): MissionKey | null {
  for (const [key, route] of Object.entries(MISSION_ROUTES)) {
    if (pathname.startsWith(route)) return key as MissionKey;
  }
  return null;
}

/**
 * Hook used inside each mission page to track reading time.
 * Call this in the page component that corresponds to a mission.
 */
export function useMissionTimer(missionKey: MissionKey) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());

  const tick = useCallback(() => {
    const progress = loadProgress();
    const mission = progress.missions[missionKey];
    if (mission.completed) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
    const newTimeSpent = mission.timeSpent + elapsed;
    startRef.current = Date.now();

    if (newTimeSpent >= REQUIRED_SECONDS) {
      progress.missions[missionKey] = {
        completed: true,
        timeSpent: newTimeSpent,
        completedAt: new Date().toISOString(),
      };
      saveProgress(progress);
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Dispatch event so other components can react
      window.dispatchEvent(new CustomEvent("missionCompleted", { detail: { key: missionKey } }));
    } else {
      progress.missions[missionKey] = { ...mission, timeSpent: newTimeSpent };
      saveProgress(progress);
      window.dispatchEvent(new CustomEvent("missionProgress", { detail: { key: missionKey, timeSpent: newTimeSpent } }));
    }
  }, [missionKey]);

  useEffect(() => {
    startRef.current = Date.now();
    intervalRef.current = setInterval(tick, 5000); // update every 5s

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // pause: flush current elapsed time
        tick();
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        startRef.current = Date.now();
        intervalRef.current = setInterval(tick, 5000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      tick(); // flush on unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tick]);

  const mission = loadProgress().missions[missionKey];
  return {
    isCompleted: mission.completed,
    timeSpent: mission.timeSpent,
    remaining: Math.max(0, REQUIRED_SECONDS - mission.timeSpent),
  };
}