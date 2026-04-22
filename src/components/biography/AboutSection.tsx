import { motion } from "framer-motion";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

export const AboutSection = ({ hero }: { hero: HeroData }) => {
  const gold = hero.colorTheme === "gold";
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="label-eyebrow mb-3">
          Biografi Lengkap
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="heading-display text-4xl md:text-6xl mb-3">
          Tentang <span className="italic">{hero.name}</span>
        </motion.h2>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={cn("h-1 w-24 origin-left rounded-full mb-12 md:mb-16", gold ? "bg-gradient-gold" : "bg-gradient-maroon")} />

        <div className="grid md:grid-cols-[minmax(0,1fr)_1.5fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-elegant aspect-[4/5] bg-brown-dark"
          >
            <img src={hero.portrait} alt={hero.name} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-brown-dark/80 backdrop-blur-md rounded-xl p-4 border border-cream/10">
              <p className="font-playfair font-bold text-cream">{hero.name}</p>
              <p className="text-xs text-cream/70">{hero.title}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 text-foreground/85 leading-relaxed text-base md:text-lg"
          >
            {hero.longBio.map((p, i) => (<p key={i}>{p}</p>))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
