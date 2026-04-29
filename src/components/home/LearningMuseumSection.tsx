import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Flag, MapPin, Route, Shield, Sparkles } from "lucide-react";

const mapPoints = [
  { place: "Lampadang", detail: "Awal kisah Cut Nyak Dien", x: "58%", y: "34%" },
  { place: "Meulaboh", detail: "Basis perjuangan Teuku Umar", x: "30%", y: "62%" },
  { place: "Gle Tarum", detail: "Medan pertempuran penting", x: "66%", y: "54%" },
];

const timeline = [
  { year: "1873", title: "Perang Aceh", text: "Perlawanan besar dimulai." },
  { year: "1880", title: "Bersatu", text: "Cut Nyak Dien & Teuku Umar memperkuat perjuangan." },
  { year: "1899", title: "Meulaboh", text: "Teuku Umar gugur secara heroik." },
  { year: "1908", title: "Warisan", text: "Semangat perjuangan terus dikenang." },
];

const materials = [
  { icon: BookOpen, title: "Biografi", text: "Kenali latar, nilai, dan perjalanan hidup dua tokoh." },
  { icon: Shield, title: "Strategi", text: "Pelajari gerilya, intelijen, dan keteguhan moral." },
  { icon: Sparkles, title: "Fakta", text: "Temukan detail penting yang mudah diingat." },
];

const missions = ["Baca biografi", "Bandingkan strategi", "Jawab quiz", "Naikkan skor game"];

export const LearningMuseumSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="max-w-3xl mb-10 md:mb-14">
        <p className="label-eyebrow mb-3">Ruang Belajar Interaktif</p>
        <h2 className="heading-display text-3xl md:text-5xl mb-4">
          Jelajahi Materi seperti <span className="italic text-gradient-gold">Museum Digital</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Ringkasan visual untuk memahami lokasi perjuangan, alur sejarah, materi utama, dan misi belajar sebelum masuk ke halaman detail.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card overflow-hidden"
        >
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-primary mb-1">Peta Perjuangan</p>
              <h3 className="font-playfair text-2xl font-bold">Jejak Aceh</h3>
            </div>
            <Route className="h-7 w-7 text-primary" />
          </div>

          <div className="relative min-h-[310px] rounded-xl bg-brown-dark overflow-hidden border border-primary/20">
            <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 70% 20%, hsl(var(--gold) / 0.24), transparent 32%), radial-gradient(circle at 20% 70%, hsl(var(--maroon) / 0.24), transparent 34%)" }} />
            <div className="absolute left-[18%] top-[18%] h-[68%] w-[58%] rotate-[-18deg] rounded-[48%] border-2 border-cream/25 bg-cream/10" />
            <div className="absolute left-[34%] top-[25%] h-[52%] w-[36%] rotate-[16deg] rounded-[46%] border border-gold/35" />
            {mapPoints.map((point, index) => (
              <div key={point.place} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: point.x, top: point.y }}>
                <div className="relative grid place-items-center h-9 w-9 rounded-full bg-gradient-gold text-primary-foreground shadow-gold animate-pulse-gold">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className={`absolute top-10 ${index === 1 ? "right-0" : "left-0"} w-36 rounded-lg bg-card/95 p-3 shadow-card border border-border`}>
                  <p className="font-cinzel text-[0.62rem] tracking-widest uppercase text-primary">{point.place}</p>
                  <p className="text-xs text-card-foreground/75 leading-snug">{point.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="rounded-2xl border border-border bg-brown-dark text-cream p-5 md:p-6 shadow-elegant"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-gold-light mb-1">Timeline Visual</p>
              <h3 className="font-playfair text-2xl font-bold">Alur Singkat</h3>
            </div>
            <Flag className="h-7 w-7 text-gold-light" />
          </div>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.year} className="grid grid-cols-[4.5rem_1fr] gap-4 items-start">
                <div className="rounded-lg bg-cream/10 border border-cream/10 px-3 py-2 text-center font-cinzel text-xs tracking-widest text-gold-light">
                  {item.year}
                </div>
                <div className="border-l border-cream/15 pl-4 pb-1">
                  <h4 className="font-semibold text-cream">{item.title}</h4>
                  <p className="text-sm text-cream/70 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-[1fr_0.8fr] gap-5 md:gap-6 mt-5 md:mt-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {materials.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <Icon className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-playfair text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="rounded-xl border border-border bg-accent p-5 shadow-card"
        >
          <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-primary mb-3">Misi Belajar</p>
          <div className="space-y-3 mb-5">
            {missions.map((mission, index) => (
              <div key={mission} className="flex items-center gap-3 rounded-lg bg-card/70 border border-border px-3 py-2.5">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{index + 1}. {mission}</span>
              </div>
            ))}
          </div>
          <Link to="/perbandingan" className="inline-flex items-center gap-2 text-sm font-cinzel tracking-[0.18em] uppercase text-primary hover:text-primary-deep transition-colors">
            Mulai dari perbandingan <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);
