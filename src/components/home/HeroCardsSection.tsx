import { motion } from "framer-motion";
import { HeroCard } from "./HeroCard";
import { cutNyakDienData } from "@/lib/data/cutNyakDien";
import { teukuUmarData } from "@/lib/data/teukuUmar";
import { comparisonRows } from "@/lib/data/comparison";

export const HeroCardsSection = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="label-eyebrow mb-3">Dua Pahlawan, Satu Tujuan</p>
        <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-5">
          Perbandingan <span className="italic text-gradient-gold">Interaktif</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Jelajahi perbedaan dan persamaan dua pahlawan Aceh yang berjuang bersama demi
          kemerdekaan bangsa.
        </p>
      </div>

      <div className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
        <HeroCard hero={cutNyakDienData} />
        <HeroCard hero={teukuUmarData} />

        {/* VS badge */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          className="hidden md:grid place-items-center absolute left-1/2 top-[18%] -translate-x-1/2 h-14 w-14 rounded-full bg-gradient-gold shadow-gold font-cinzel text-sm font-bold text-primary-foreground z-10 animate-pulse-gold"
        >
          VS
        </motion.div>
      </div>

      {/* Comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-16 rounded-2xl overflow-hidden bg-brown-dark text-cream shadow-elegant"
      >
        <div className="grid grid-cols-3 text-xs md:text-sm font-cinzel tracking-[0.2em] uppercase border-b border-cream/10">
          <div className="p-4 text-gold-light text-center md:text-left md:pl-6">Cut Nyak Dien</div>
          <div className="p-4 text-cream/70 text-center">Aspek</div>
          <div className="p-4 text-maroon-light text-center md:text-right md:pr-6">Teuku Umar</div>
        </div>
        {comparisonRows.slice(0, 4).map((row, i) => (
          <div
            key={row.aspect}
            className={`grid grid-cols-3 text-sm md:text-base ${i % 2 ? "bg-brown-medium/30" : ""}`}
          >
            <div className="p-4 text-gold-light text-center md:text-left md:pl-6">{row.cnd}</div>
            <div className="p-4 text-cream/60 text-center font-cinzel text-xs uppercase tracking-wider">{row.aspect}</div>
            <div className="p-4 text-maroon-light text-center md:text-right md:pr-6">{row.tu}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
