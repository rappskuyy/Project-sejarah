import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const C = (Icons as any)[name] ?? Icons.Star;
  return <C className={className} />;
};

export const FactsSection = ({ hero }: { hero: HeroData }) => {
  const gold = hero.colorTheme === "gold";
  return (
    <section className="py-24 md:py-32 bg-brown-dark text-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className={cn("font-cinzel text-xs tracking-[0.35em] uppercase mb-3", gold ? "text-gold-light" : "text-maroon-light")}>
            Yang Perlu Diketahui
          </p>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl">
            Fakta <span className="italic text-gradient-gold">Menarik</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {hero.uniqueFacts.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="bg-cream text-foreground rounded-2xl p-7 shadow-card hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={cn("mb-5 grid place-items-center h-12 w-12 rounded-full", gold ? "bg-gold/15 text-gold-dark" : "bg-maroon/15 text-maroon-dark")}>
                <Icon name={f.icon} className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
