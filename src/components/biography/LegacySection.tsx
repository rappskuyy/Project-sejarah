import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const C = (Icons as any)[name] ?? Icons.Award;
  return <C className={className} />;
};

const accentClasses = [
  "bg-gradient-to-br from-amber-400 to-amber-600",
  "bg-gradient-to-br from-orange-500 to-red-600",
  "bg-gradient-to-br from-yellow-500 to-amber-700",
  "bg-gradient-to-br from-amber-500 to-orange-600",
  "bg-gradient-to-br from-red-500 to-amber-700",
  "bg-gradient-to-br from-orange-400 to-amber-700",
];

export const LegacySection = ({ hero }: { hero: HeroData }) => {
  const gold = hero.colorTheme === "gold";
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-eyebrow mb-3">Pengaruh Abadi</p>
          <h2 className="heading-display text-4xl md:text-5xl mb-4">
            Warisan <span className="italic text-gradient-gold">& Penghargaan</span>
          </h2>
          <p className="text-muted-foreground mb-5">
            Jasa dan pengorbanan sang pahlawan terus dikenang dan diabadikan dalam berbagai
            bentuk penghormatan di seluruh Indonesia.
          </p>
          <div className={cn("mx-auto h-1 w-20 rounded-full", gold ? "bg-gradient-gold" : "bg-gradient-maroon")} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hero.legacy.map((l, i) => (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="relative bg-card border border-border rounded-2xl p-7 shadow-card overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <span className={cn("absolute top-0 inset-x-0 h-1", accentClasses[i % accentClasses.length])} />
              <div className={cn("mb-5 grid place-items-center h-14 w-14 rounded-xl text-white shadow-lg", accentClasses[i % accentClasses.length])}>
                <Icon name={l.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{l.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
