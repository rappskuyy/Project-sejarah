import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Sword, Flame, Skull, ArrowRight, Dot } from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

interface Props { hero: HeroData; }

export const HeroCard = ({ hero }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const gold = hero.colorTheme === "gold";

  const themeBadge = gold
    ? "bg-gradient-gold text-primary-foreground"
    : "bg-gradient-maroon text-secondary-foreground";
  const themeBtn = gold
    ? "bg-gradient-gold hover:shadow-gold text-primary-foreground"
    : "bg-gradient-maroon hover:shadow-maroon text-secondary-foreground";
  const themeBar = gold ? "bg-gradient-gold" : "bg-gradient-maroon";
  const themeText = gold ? "text-primary" : "text-secondary";
  const themeOverlay = gold ? "bg-gradient-card-gold" : "bg-gradient-card-maroon";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-card rounded-3xl shadow-card overflow-hidden border border-border/60 flex flex-col"
    >
      {/* Hero image */}
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={hero.portrait}
          alt={hero.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className={cn("absolute inset-0", themeOverlay)} style={{ background: gold ? "var(--gradient-card-gold)" : "var(--gradient-card-maroon)" }} />

        <div className="absolute top-4 left-4">
          <span className={cn("inline-block px-3 py-1 rounded-full text-[0.65rem] font-cinzel font-semibold tracking-[0.25em] uppercase", themeBadge)}>
            {hero.title}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5 text-cream">
          <h3 className="font-playfair font-bold text-3xl md:text-4xl drop-shadow-lg">{hero.name}</h3>
          <p className="text-sm mt-1 text-cream/85">{hero.birthYear} – {hero.deathYear}</p>
        </div>
      </div>

      {/* Info grid */}
      <div className="p-6 grid grid-cols-2 gap-3">
        {[
          { icon: MapPin, label: "Asal", value: hero.birthPlace },
          { icon: Sword, label: "Senjata Utama", value: hero.mainWeapon },
          { icon: Flame, label: "Gaya Perang", value: hero.fightingStyle },
          { icon: Skull, label: "Wafat", value: String(hero.deathYear) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-muted/50 rounded-xl p-3">
            <p className={cn("flex items-center gap-1.5 text-[0.7rem] uppercase tracking-widest font-cinzel", themeText)}>
              <Icon className="h-3 w-3" /> {label}
            </p>
            <p className="text-sm font-medium mt-1 text-foreground leading-tight">{value}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="px-6 pb-2">
        <p className={cn("font-cinzel text-xs tracking-[0.3em] uppercase mb-3", themeText)}>Kekuatan</p>
        <div className="space-y-3">
          {hero.stats.map((s, i) => (
            <div key={s.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground/80">{s.label}</span>
                <span className={cn("font-semibold", themeText)}>{s.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.value}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  className={cn("h-full rounded-full", themeBar)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facts */}
      <div className="px-6 py-5">
        <p className={cn("font-cinzel text-xs tracking-[0.3em] uppercase mb-3", themeText)}>Fakta Unik</p>
        <ul className="space-y-1.5">
          {hero.uniqueFacts.slice(0, 4).map((f) => (
            <li key={f.title} className="flex gap-1.5 text-sm text-foreground/85">
              <Dot className={cn("h-5 w-5 shrink-0 -ml-1", themeText)} />
              <span className="leading-snug">{f.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto p-6 pt-2">
        <Link
          to={`/${hero.slug}`}
          className={cn(
            "flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-cinzel text-sm tracking-[0.2em] uppercase transition-all duration-300",
            themeBtn,
          )}
        >
          Baca Kisah Lengkap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};
