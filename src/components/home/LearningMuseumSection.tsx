import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, CheckCircle2, Flag, MapPin,
  Route, Shield, Sparkles,
} from "lucide-react";
import OldMapPreview from "@/components/home/OldMapPreview";

type HistoricalEvent = {
  id: string;
  year: string;
  title: string;
  location: string;
  region: string;
  text: string;
  focus: [number, number];
};

const events: HistoricalEvent[] = [
  { id: "banda-aceh", year: "1873", title: "Perang Aceh Dimulai", location: "Banda Aceh", region: "Kota Banda Aceh", text: "Pusat Kesultanan Aceh menjadi titik awal perlawanan besar terhadap ekspedisi Belanda.", focus: [95.32, 5.55] },
  { id: "aceh-besar", year: "1880", title: "Lampadang dan Basis Keluarga", location: "Lampadang", region: "Aceh Besar", text: "Wilayah Aceh Besar melekat dengan kisah awal Cut Nyak Dien dan jaringan perjuangan keluarganya.", focus: [95.43, 5.47] },
  { id: "aceh-barat", year: "1896", title: "Taktik Teuku Umar", location: "Meulaboh", region: "Aceh Barat", text: "Teuku Umar menggunakan strategi penyamaran, logistik, dan serangan balik dari pesisir barat Aceh.", focus: [96.13, 4.14] },
  { id: "meulaboh", year: "1899", title: "Gugur di Meulaboh", location: "Meulaboh", region: "Aceh Barat", text: "Teuku Umar gugur dalam pertempuran, tetapi semangat gerilya Aceh terus berlanjut.", focus: [96.13, 4.14] },
  { id: "gayo", year: "1908", title: "Akhir Perjuangan Cut Nyak Dien", location: "Pedalaman Aceh", region: "Gayo Lues", text: "Perlawanan berlanjut ke wilayah pedalaman sebelum Cut Nyak Dien ditangkap dan diasingkan.", focus: [97.35, 3.94] },
];

const materials = [
  { icon: BookOpen, title: "Biografi Tokoh", text: "Latar keluarga, masa muda, dan perubahan hidup Cut Nyak Dien serta Teuku Umar.", to: "/cut-nyak-dien" },
  { icon: Shield, title: "Strategi Perang", text: "Gerilya, penguasaan medan, penyamaran, dan cara membangun kepercayaan rakyat.", to: "/perbandingan" },
  { icon: MapPin, title: "Peta Wilayah Aceh", text: "Pelajari batas kabupaten/kota Aceh, lokasi sejarah, dan rute perjuangan melalui peta interaktif.", to: "/teuku-umar" },
  { icon: Sparkles, title: "Fakta Cepat", text: "Ringkasan tanggal, tempat, nilai perjuangan, dan istilah penting untuk persiapan quiz.", to: "/game" },
];

const missions = ["Telusuri peta Aceh", "Klik timeline sejarah", "Baca materi cepat", "Uji pemahaman di game"];
export const LearningMuseumSection = () => {
  const [activeEvent, setActiveEvent] = useState(events[0]);

  const activeRegionEvent = activeEvent;

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

            <div className="relative min-h-[390px] md:min-h-[540px] rounded-xl border border-border overflow-hidden bg-[#f5eedf]">
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
                <h4 className="font-playfair text-xl font-bold">
                  {activeRegionEvent.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  {activeRegionEvent.text}
                </p>
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
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {materials.map(({ icon: Icon, title, text, to }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.04 }}
                className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{text}</p>
                <Link to={to} className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.18em] uppercase text-primary hover:text-primary-deep transition-colors">
                  Buka Materi <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-xl border border-border bg-brown-dark p-5 text-cream shadow-elegant"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-gold-light">Misi Belajar</p>
              <Route className="h-6 w-6 text-gold-light" />
            </div>
            <div className="space-y-3 mb-5">
              {missions.map((mission, i) => (
                <div key={mission} className="flex items-center gap-3 rounded-lg bg-cream/10 border border-cream/10 px-3 py-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold-light shrink-0" />
                  <span className="text-sm font-medium">{i + 1}. {mission}</span>
                </div>
              ))}
            </div>
            <Link to="/perbandingan" className="inline-flex items-center gap-2 text-sm font-cinzel tracking-[0.18em] uppercase text-gold-light hover:text-cream transition-colors">
              Mulai dari perbandingan <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};