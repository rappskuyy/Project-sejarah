import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

export const QuoteStatsSection = ({ hero }: { hero: HeroData }) => {
  const gold = hero.colorTheme === "gold";
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        {/* Gunakan hero.heroBg agar tiap halaman punya background berbeda */}
        <img src={hero.heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brown-dark/65" />
      </div>

      <div className="relative container max-w-5xl text-center text-cream">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={cn("h-px w-16 md:w-28", gold ? "bg-gold" : "bg-maroon-light")} />
          <span className={cn("grid place-items-center h-10 w-10 rounded-full border", gold ? "border-gold text-gold-light" : "border-maroon-light text-maroon-light")}>
            <Swords className="h-4 w-4" />
          </span>
          <span className={cn("h-px w-16 md:w-28", gold ? "bg-gold" : "bg-maroon-light")} />
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-playfair italic text-2xl md:text-4xl lg:text-5xl leading-snug max-w-4xl mx-auto"
        >
          "{hero.quote}"
        </motion.blockquote>
        <p className="mt-6 font-cinzel text-xs tracking-[0.35em] uppercase text-cream/60">
          — Semangat {hero.name}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-20">
          {hero.heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className={cn("mx-auto mb-4 h-3 w-3 rounded-full", gold ? "bg-gold-light" : "bg-maroon-light")} />
              <p className="font-playfair text-4xl md:text-5xl font-bold mb-2">{s.value}</p>
              <p className="font-cinzel text-[0.7rem] tracking-[0.3em] uppercase text-cream/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};