import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plane, Gamepad2, Trophy, Brain } from "lucide-react";
import gamePreview from "@/assets/game-preview.jpg";

export const PreviewSection = () => (
  <section className="py-24 md:py-32 bg-cream-dark">
    <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="label-eyebrow mb-3">Mainkan & Pelajari</p>
        <h2 className="heading-display text-4xl md:text-5xl mb-5">
          Game Pesawat <span className="italic text-gradient-gold">Pahlawan</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Tembak musuh penjajah, jaga amunisi, dan ketika peluru habis — jawab kuis
          tentang Cut nyak dhien & Teuku Umar untuk mengisi ulang amunisi. Belajar
          sejarah sambil bermain!
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {[
            { icon: Gamepad2, label: "Game Arcade" },
            { icon: Brain, label: "Kuis Sejarah" },
            { icon: Trophy, label: "Leaderboard" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
              <Icon className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-xs font-cinzel tracking-widest uppercase text-foreground/80">{label}</p>
            </div>
          ))}
        </div>

        <Link
          to="/game"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-maroon text-secondary-foreground font-cinzel text-sm tracking-[0.2em] uppercase shadow-maroon hover:scale-105 transition-transform"
        >
          <Plane className="h-4 w-4" /> Mulai Game
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/3]"
      >
        <img src={gamePreview} alt="Preview Game Pesawat" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-cream">
          <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-light mb-2">Coming up</p>
          <p className="font-playfair text-2xl">Terbang menembus langit Aceh</p>
        </div>
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-6 grid place-items-center h-14 w-14 rounded-full bg-gradient-gold shadow-gold"
        >
          <Plane className="h-6 w-6 text-primary-foreground" />
        </motion.div>
      </motion.div>
    </div>
  </section>
);
