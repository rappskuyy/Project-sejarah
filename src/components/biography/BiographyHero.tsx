import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, MapPin, Star } from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

export const BiographyHero = ({ hero }: { hero: HeroData }) => {
  const gold = hero.colorTheme === "gold";
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero.heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/95 via-brown-dark/70 to-transparent" />
      </div>

      <div className="relative z-10 container pb-24 pt-32 text-cream max-w-3xl">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm text-cream/70 mb-8"
        >
          <Link to="/" className="hover:text-gold-light transition">Beranda</Link>
          <ChevronRight className="h-4 w-4" />
          <span className={cn(gold ? "text-gold-light" : "text-maroon-light")}>{hero.name}</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-playfair font-bold leading-[0.95] text-5xl sm:text-7xl md:text-8xl mb-6"
        >
          {hero.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={cn(
            "font-playfair italic text-xl md:text-2xl mb-4",
            gold ? "text-gold-light" : "text-maroon-light",
          )}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={cn("h-1 w-24 origin-left mb-8 rounded-full", gold ? "bg-gradient-gold" : "bg-gradient-maroon")}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-base md:text-lg text-cream/85 leading-relaxed mb-10 max-w-2xl"
        >
          {hero.shortBio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap gap-3"
        >
          {[
            { icon: Calendar, label: "Lahir", value: String(hero.birthYear) },
            { icon: MapPin, label: "Asal", value: hero.birthPlace },
            { icon: Star, label: "Wafat", value: String(hero.deathYear) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 bg-brown-dark/40 backdrop-blur-sm border border-cream/10 rounded-xl px-4 py-3">
              <div className={cn("grid place-items-center h-9 w-9 rounded-full", gold ? "bg-gold/20 text-gold-light" : "bg-maroon/20 text-maroon-light")}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[0.6rem] font-cinzel tracking-[0.25em] uppercase text-cream/60">{label}</p>
                <p className="font-medium text-cream text-sm">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute right-6 bottom-1/2 hidden md:flex flex-col items-center gap-3 text-cream/50 [writing-mode:vertical-rl] font-cinzel text-[0.65rem] tracking-[0.4em] uppercase">
        <span>Gulir</span>
        <span className="h-12 w-px bg-cream/40 animate-pulse" />
      </div>
    </section>
  );
};
