import { motion } from "framer-motion";
import { HeroCard } from "./HeroCard";
import { cutNyakDienData } from "@/lib/data/cutNyakDien";
import { teukuUmarData } from "@/lib/data/teukuUmar";
import { comparisonRows } from "@/lib/data/comparison";

export const HeroCardsSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container max-w-4xl">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="label-eyebrow mb-3">Dua Pahlawan, Satu Tujuan</p>
        <h2 className="heading-display text-3xl md:text-5xl mb-4">
          Perbandingan <span className="italic text-gradient-gold">Interaktif</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Jelajahi perbedaan dan persamaan dua pahlawan Aceh yang berjuang bersama demi
          kemerdekaan bangsa.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4 items-stretch">
        <HeroCard hero={cutNyakDienData} compact />
        <HeroCard hero={teukuUmarData} compact />
      </div>

      {/* Comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-10 rounded-2xl overflow-hidden bg-brown-dark text-cream shadow-elegant"
      >
        <div className="grid grid-cols-3 text-[0.6rem] md:text-xs font-cinzel tracking-[0.2em] uppercase border-b border-cream/10">
          <div className="p-3 text-gold-light text-center">Cut nyak dhien</div>
          <div className="p-3 text-cream/70 text-center">Aspek</div>
          <div className="p-3 text-maroon-light text-center">Teuku Umar</div>
        </div>
        {comparisonRows.slice(0, 4).map((row, i) => (
          <div
            key={row.aspect}
            className={`grid grid-cols-3 text-xs md:text-sm ${i % 2 ? "bg-brown-medium/30" : ""}`}
          >
            <div className="p-3 text-gold-light text-center">{row.cnd}</div>
            <div className="p-3 text-cream/60 text-center font-cinzel text-[0.6rem] uppercase tracking-wider">{row.aspect}</div>
            <div className="p-3 text-maroon-light text-center">{row.tu}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
