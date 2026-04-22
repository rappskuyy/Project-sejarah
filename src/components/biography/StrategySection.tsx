import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target } from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

export const StrategySection = ({ hero }: { hero: HeroData }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const gold = hero.colorTheme === "gold";

  return (
    <section ref={ref} className="py-24 md:py-32 bg-brown-dark text-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className={cn("font-cinzel text-xs tracking-[0.35em] uppercase mb-3", gold ? "text-gold-light" : "text-maroon-light")}>
            Taktik Jenius
          </p>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl">
            Strategi <span className="italic text-gradient-gold">Perang</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {hero.strategies.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-brown-medium/40 border border-cream/10 rounded-2xl p-7 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={cn("grid place-items-center h-11 w-11 rounded-xl shrink-0", gold ? "bg-gold/20 text-gold-light" : "bg-maroon/30 text-maroon-light")}>
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-xl mb-1.5">{s.title}</h3>
                  <p className="text-sm text-cream/75 leading-relaxed">{s.desc}</p>
                </div>
              </div>

              <div className="flex justify-between text-xs mb-2">
                <span className="font-cinzel tracking-widest uppercase text-cream/60">Efektivitas</span>
                <span className={cn("font-bold", gold ? "text-gold-light" : "text-maroon-light")}>{s.value || s.effectiveness}%</span>
              </div>
              <div className="h-2 rounded-full bg-cream/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.effectiveness}%` } : {}}
                  transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className={cn("h-full rounded-full", gold ? "bg-gradient-gold" : "bg-gradient-maroon")}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
