import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Flag, MapPin,
  Route, Shield, Sparkles, Award, CheckCircle2,
  Clock, Lock, ChevronRight,
} from "lucide-react";
import OldMapPreview from "@/components/home/OldMapPreview";
import { CertificateModal } from "@/components/home/CertificateModal";
import {
  loadProgress,
  type MissionKey,
  type AllProgress,
  REQUIRED_SECONDS,
} from "@/hooks/useMissionProgress";

type HistoricalEvent = {
  id: string;
  year: string;
  title: string;
  location: string;
  region: string;
  text: string;
  focus: [number, number];
};

// Perjalanan lengkap Cut Nyak Dien & Teuku Umar — kronologis akurat
const events: HistoricalEvent[] = [
  {
    id: "lahir-cnd", year: "1848", title: "Cut Nyak Dien Lahir di Lampadang",
    location: "Lampadang, Aceh Besar", region: "Aceh Besar",
    text: "Cut Nyak Dien lahir sekitar 1848 di Lampadang, putri Teuku Nanta Setia — uleebalang VI Mukim. Sejak kecil ia dididik dengan nilai-nilai Islam yang kuat dan jiwa kebangsawanan Aceh yang tinggi.",
    focus: [95.4333, 5.4833],
  },
  {
    id: "lahir-tu", year: "1854", title: "Teuku Umar Lahir di Meulaboh",
    location: "Meulaboh, Aceh Barat", region: "Aceh Barat",
    text: "Teuku Umar Johan Pahlawan lahir di Meulaboh sekitar 1854 dari keluarga bangsawan Aceh. Sejak remaja ia menunjukkan jiwa kepemimpinan dan keberanian yang luar biasa dalam memimpin pasukan.",
    focus: [96.1283, 4.1417],
  },
  {
    id: "perang-mulai", year: "1873", title: "Perang Aceh Dimulai",
    location: "Banda Aceh (Kutaraja)", region: "Kota Banda Aceh",
    text: "Belanda melancarkan ekspedisi militer pertama ke Kutaraja. Sultan Mahmud Syah memimpin perlawanan dan berhasil memukul mundur pasukan Belanda. Namun pada ekspedisi kedua Belanda berhasil merebut Masjid Raya.",
    focus: [95.3239, 5.5477],
  },
  {
    id: "nikah-pertama", year: "1875", title: "Cut Nyak Dien Menikah Pertama",
    location: "Lampadang, Aceh Besar", region: "Aceh Besar",
    text: "Cut Nyak Dien menikah dengan Teuku Ibrahim Lamnga, putra uleebalang Lam Nga XIII. Pernikahan ini memperkuat jaringan perjuangan keluarga bangsawan Aceh dalam menghadapi invasi Belanda.",
    focus: [95.4333, 5.4833],
  },
  {
    id: "ibrahim-gugur", year: "1878", title: "Suami Pertama Cut Nyak Dien Gugur",
    location: "Gle Tarum, Aceh Besar", region: "Aceh Besar",
    text: "Teuku Ibrahim Lamnga gugur di pertempuran Gle Tarum pada 1878. Cut Nyak Dien sangat berduka namun menolak melarikan diri — ia bersumpah akan meneruskan perjuangan suaminya melawan penjajah Belanda.",
    focus: [95.6000, 5.5200],
  },
  {
    id: "nikah-tu", year: "1880", title: "Cut Nyak Dien Menikahi Teuku Umar",
    location: "Banda Aceh", region: "Kota Banda Aceh",
    text: "Teuku Umar melamar Cut Nyak Dien dengan alasan perjuangan. Cut Nyak Dien menerima karena Teuku Umar adalah pejuang gigih. Pernikahan ini menyatukan dua kekuatan perlawanan terbesar Aceh.",
    focus: [95.3239, 5.5477],
  },
  {
    id: "gerilya-utara", year: "1884", title: "Perang Gerilya di Aceh Utara",
    location: "Paya Bakong, Aceh Utara", region: "Aceh Utara",
    text: "Teuku Umar dan Cut Nyak Dien memimpin perang gerilya di Aceh Utara. Cut Nyak Dien aktif menguatkan moral pasukan, merawat pejuang yang terluka, dan ikut berpindah-pindah markas di hutan.",
    focus: [97.0833, 4.9500],
  },
  {
    id: "penyamaran", year: "1893", title: "Teuku Umar Infiltrasi Belanda",
    location: "Kutaraja, Banda Aceh", region: "Kota Banda Aceh",
    text: "Teuku Umar berpura-pura menyerah ke Belanda dan berhasil mendapat 800 senjata, 25.000 peluru, dan 17 meriam. Ini adalah strategi gerilya paling cerdik — Cut Nyak Dien mendukung penuh siasat suaminya.",
    focus: [95.3239, 5.5477],
  },
  {
    id: "balik-serang", year: "1896", title: "Teuku Umar Berbalik Melawan Belanda",
    location: "Pesisir Barat Aceh", region: "Aceh Barat",
    text: "Dengan senjata yang didapat dari Belanda, Teuku Umar memimpin serangan besar-besaran di pesisir barat. Cut Nyak Dien ikut dalam pengungsian dan terus mengobarkan semangat para pejuang di garis belakang.",
    focus: [95.9000, 4.5000],
  },
  {
    id: "tu-gugur", year: "1899", title: "Teuku Umar Gugur — Cut Nyak Dien Berjuang Sendiri",
    location: "Meulaboh, Aceh Barat", region: "Aceh Barat",
    text: "11 Februari 1899: Teuku Umar gugur karena dikhianati. Cut Nyak Dien yang menderita rematik parah dan mulai rabun terus memimpin sisa pasukan di hutan. Ia menolak menyerah meski tubuhnya semakin lemah.",
    focus: [96.1283, 4.1417],
  },
  {
    id: "beutong", year: "1905", title: "Cut Nyak Dien Ditangkap Belanda",
    location: "Beutong Ateuh, Nagan Raya", region: "Nagan Raya",
    text: "Pang Laot, pengikut setia Cut Nyak Dien, terpaksa memberitahu lokasi persembunyian ke Belanda karena kasihan melihat kondisinya yang sangat memprihatinkan. Belanda menangkap Cut Nyak Dien di pedalaman Nagan Raya.",
    focus: [96.3333, 4.1000],
  },
  {
    id: "sumedang", year: "1908", title: "Cut Nyak Dien Wafat di Sumedang",
    location: "Sumedang, Jawa Barat", region: "Jawa Barat",
    text: "Diasingkan ke Sumedang, Cut Nyak Dien tetap mengajar mengaji hingga wafat 6 November 1908. Dimakamkan di Gunung Puyuh, Sumedang. Presiden Soekarno menganugerahinya gelar Pahlawan Nasional pada 1964.",
    focus: [107.9200, -6.8500],
  },
];

const MISSIONS: {
  key: MissionKey;
  icon: typeof BookOpen;
  title: string;
  text: string;
  to: string;
  label: string;
}[] = [
  { key: "biografi", icon: BookOpen, title: "Biografi Tokoh", text: "Latar keluarga, masa muda, dan perubahan hidup Cut Nyak Dien serta Teuku Umar.", to: "/cut-nyak-dhien", label: "Telusuri peta Aceh" },
  { key: "strategi", icon: Shield, title: "Strategi Perang", text: "Gerilya, penguasaan medan, penyamaran, dan cara membangun kepercayaan rakyat.", to: "/perbandingan", label: "Klik timeline sejarah" },
  { key: "peta", icon: MapPin, title: "Peta Wilayah Aceh", text: "Pelajari batas kabupaten/kota Aceh, lokasi sejarah, dan rute perjuangan melalui peta interaktif.", to: "/teuku-umar", label: "Baca materi cepat" },
  { key: "game", icon: Sparkles, title: "Fakta Cepat & Game", text: "Ringkasan tanggal, tempat, nilai perjuangan, dan istilah penting untuk persiapan quiz.", to: "/game", label: "Uji pemahaman di game" },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function MissionItem({
  mission,
  progress,
  index,
}: {
  mission: typeof MISSIONS[0];
  progress: AllProgress;
  index: number;
}) {
  const mp = progress.missions[mission.key];
  const isCompleted = mp.completed;
  const timeSpent = mp.timeSpent;
  const pct = Math.min(1, timeSpent / REQUIRED_SECONDS);
  const remaining = Math.max(0, REQUIRED_SECONDS - timeSpent);
  const Icon = mission.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="relative"
    >
      <Link
        to={mission.to}
        className={`group flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-all duration-300 ${
          isCompleted
            ? "border-gold/30 bg-gold/8 hover:border-gold/50"
            : "border-cream/10 bg-cream/5 hover:bg-cream/10 hover:border-cream/20"
        }`}
      >
        {/* Status icon */}
        <div
          className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
            isCompleted
              ? "border-gold/60 bg-gold/20"
              : "border-cream/20 bg-cream/5"
          }`}
        >
          {isCompleted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <CheckCircle2 className="h-4.5 w-4.5 text-gold-light" />
            </motion.div>
          ) : (
            <Icon className="h-4 w-4 text-cream/40" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium leading-snug ${
              isCompleted ? "text-gold-light" : "text-cream"
            }`}
          >
            {index + 1}. {mission.label}
          </p>
          {!isCompleted && timeSpent > 0 && (
            <p className="text-[0.65rem] text-cream/40 mt-0.5">
              Sisa {formatTime(remaining)} lagi
            </p>
          )}
          {!isCompleted && timeSpent === 0 && (
            <p className="text-[0.65rem] text-cream/30 mt-0.5">
              Butuh 2 menit baca
            </p>
          )}
        </div>

        {/* Progress ring (if started but not done) */}
        {!isCompleted && timeSpent > 0 && (
          <div className="shrink-0 relative h-8 w-8">
            <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,214,130,0.1)" strokeWidth="2.5" />
              <circle
                cx="16" cy="16" r="13"
                fill="none"
                stroke="rgba(255,214,130,0.7)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 13}
                strokeDashoffset={2 * Math.PI * 13 * (1 - pct)}
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock className="h-3 w-3 text-gold/60" />
            </div>
          </div>
        )}

        {/* Arrow */}
        <ChevronRight className={`shrink-0 h-4 w-4 transition-transform group-hover:translate-x-0.5 ${isCompleted ? "text-gold/60" : "text-cream/20"}`} />
      </Link>

      {/* Progress bar under item */}
      {!isCompleted && timeSpent > 0 && (
        <div className="mx-4 h-0.5 rounded-full bg-cream/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${pct * 100}%`,
              background: "linear-gradient(90deg, rgba(255,214,130,0.4), rgba(255,214,130,0.7))",
            }}
            animate={{ width: `${pct * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
    </motion.div>
  );
}

export const LearningMuseumSection = () => {
  const [activeEvent, setActiveEvent] = useState(events[0]);
  const [progress, setProgress] = useState<AllProgress>(loadProgress);
  const [certOpen, setCertOpen] = useState(false);

  const completedCount = Object.values(progress.missions).filter((m) => m.completed).length;
  const allCompleted = completedCount === 4;

  // Listen for progress updates from mission pages
  const refreshProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    window.addEventListener("missionCompleted", refreshProgress);
    window.addEventListener("missionProgress", refreshProgress);
    // Also poll every 10s as fallback (when navigating back)
    const poll = setInterval(refreshProgress, 10_000);
    return () => {
      window.removeEventListener("missionCompleted", refreshProgress);
      window.removeEventListener("missionProgress", refreshProgress);
      clearInterval(poll);
    };
  }, [refreshProgress]);

  // Refresh on focus (user returns from another tab/page)
  useEffect(() => {
    window.addEventListener("focus", refreshProgress);
    return () => window.removeEventListener("focus", refreshProgress);
  }, [refreshProgress]);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="label-eyebrow mb-3">Ruang Belajar Interaktif</p>
          <h2 className="heading-display text-3xl md:text-5xl mb-4">
            Peta Kuno Aceh untuk <span className="italic text-gradient-gold">Menelusuri Perjuangan</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Peta ini menggunakan gaya peta tua, memberi nuansa sejarah Aceh yang lebih antik sambil menampilkan lokasi peristiwa penting.
          </p>
        </div>

        <div className="grid xl:grid-cols-[1.25fr_0.75fr] gap-5 md:gap-6 items-start">
          {/* MAP */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-card overflow-hidden"
          >
            <div className="mb-5">
              <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-primary mb-1">Peta Kuno Aceh</p>
              <h3 className="font-playfair text-2xl font-bold">Peta Nostalgia Perjuangan</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Peta ini menampilkan tampilan gaya peta tua, cocok untuk pengalaman belajar sejarah Aceh yang lebih klasik.
              </p>
            </div>
            <div className="relative h-[390px] md:h-[540px] rounded-xl border border-border overflow-hidden bg-[#f5eedf]" style={{ isolation: 'isolate', zIndex: 0 }}>
              <OldMapPreview
                activeId={activeEvent.id}
                activeFocus={activeEvent.focus}
                events={events}
                onMarkerClick={(id) => {
                  const next = events.find((e) => e.id === id);
                  if (next) setActiveEvent(next);
                }}
              />
              <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-auto md:w-80 rounded-xl border border-border bg-popover/95 p-4 text-popover-foreground shadow-elegant backdrop-blur">
                <p className="font-cinzel text-[0.65rem] tracking-[0.24em] uppercase text-primary mb-1">
                  {activeEvent.location}
                </p>
                <h4 className="font-playfair text-xl font-bold">{activeEvent.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{activeEvent.text}</p>
              </div>
            </div>
          </motion.div>

          {/* TIMELINE */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-primary mb-1">Timeline Terhubung</p>
                <h3 className="font-playfair text-2xl font-bold">Klik Tahun</h3>
              </div>
              <Flag className="h-7 w-7 text-primary" />
            </div>
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {events.map((item) => {
                const isActive = item.id === activeEvent.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveEvent(item)}
                    className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${isActive ? "border-maroon bg-accent shadow-card" : "border-border bg-background hover:bg-accent/70"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 rounded-lg px-3 py-2 text-center font-cinzel text-xs tracking-widest ${isActive ? "bg-gradient-maroon text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {item.year}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="mt-1 flex items-center gap-1.5 text-xs font-cinzel tracking-wider uppercase text-primary">
                          <MapPin className="h-3.5 w-3.5" /> {item.location}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM */}
        <div className="grid lg:grid-cols-[1fr_0.78fr] gap-5 md:gap-6 mt-5 md:mt-6">
          {/* Material cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {MISSIONS.map(({ icon: Icon, title, text, to, key }, i) => {
              const isCompleted = progress.missions[key].completed;
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.04 }}
                  className={`group rounded-xl border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${
                    isCompleted
                      ? "border-gold/30 hover:border-gold/50"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {isCompleted && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 className="h-4 w-4 text-gold-light" />
                    </div>
                  )}
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
                    isCompleted
                      ? "bg-gold/15 text-gold-light"
                      : "bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{text}</p>
                  <Link
                    to={to}
                    className={`inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.18em] uppercase transition-colors ${
                      isCompleted
                        ? "text-gold-light hover:text-gold"
                        : "text-primary hover:text-primary-deep"
                    }`}
                  >
                    {isCompleted ? "Buka Lagi" : "Buka Materi"} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* MISSION BOX */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-xl border border-border bg-brown-dark p-5 text-cream shadow-elegant flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-gold-light">Misi Belajar</p>
                <p className="text-cream/50 text-xs mt-0.5">{completedCount}/4 selesai</p>
              </div>
              <div className="flex items-center gap-2">
                <Route className="h-5 w-5 text-gold-light" />
                {/* Overall progress */}
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-5 rounded-full transition-all duration-500 ${
                        i < completedCount ? "bg-gold-light" : "bg-cream/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mission list */}
            <div className="space-y-2 flex-1">
              {MISSIONS.map((mission, i) => (
                <MissionItem
                  key={mission.key}
                  mission={mission}
                  progress={progress}
                  index={i}
                />
              ))}
            </div>

            {/* Tip */}
            <p className="text-[0.65rem] text-cream/30 mt-4 leading-relaxed font-cinzel tracking-wide">
              Baca setiap halaman materi minimal <span className="text-gold/50">2 menit</span> agar misi otomatis terceklis.
            </p>

            {/* Certificate CTA */}
            <AnimatePresence>
              {allCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mt-4"
                >
                  <button
                    onClick={() => setCertOpen(true)}
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 font-cinzel text-sm tracking-[0.2em] uppercase font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #FFD682, #C9A84C)",
                      color: "#1A0E06",
                      boxShadow: "0 6px 24px rgba(255,214,130,0.3)",
                    }}
                  >
                    <Award className="h-4 w-4" />
                    {progress.certificateClaimed ? "Lihat Sertifikat Lagi" : "Klaim Sertifikat"}
                  </button>
                  {progress.certificateClaimed && (
                    <p className="text-center text-[0.6rem] text-gold/50 font-cinzel tracking-wider mt-2 uppercase">
                      Sertifikat sudah diklaim ✓
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lock state when not all done */}
            {!allCompleted && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-cream/8 bg-cream/5 px-3 py-2.5">
                <Lock className="h-3.5 w-3.5 text-cream/25 shrink-0" />
                <p className="text-[0.65rem] text-cream/30 font-cinzel tracking-wider">
                  Selesaikan semua misi untuk membuka sertifikat
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        open={certOpen}
        onClose={() => setCertOpen(false)}
        onClaimed={refreshProgress}
      />
    </section>
  );
};