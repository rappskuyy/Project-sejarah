import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Sword, Flame, Skull, ArrowRight, Dot } from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

interface Props { hero: HeroData; }

interface Props { hero: HeroData; compact?: boolean }

export const HeroCard = ({ hero, compact = false }: Props) => {
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
      <div className={cn("relative overflow-hidden", compact ? "aspect-[5/3]" : "aspect-[5/4]") }>
        <img
          src={hero.portrait}
          alt={hero.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className={cn("absolute inset-0", themeOverlay)} style={{ background: gold ? "var(--gradient-card-gold)" : "var(--gradient-card-maroon)" }} />

        <div className={cn("absolute", compact ? "top-3 left-3" : "top-4 left-4")}>
          <span className={cn("inline-block rounded-full font-cinzel font-semibold tracking-[0.25em] uppercase", themeBadge, compact ? "px-2.5 py-0.5 text-[0.55rem]" : "px-3 py-1 text-[0.65rem]")}>
            {hero.title}
          </span>
        </div>

        <div className={cn("absolute text-cream", compact ? "bottom-3 left-4 right-4" : "bottom-5 left-5 right-5")}>
          <h3 className={cn("font-playfair font-bold drop-shadow-lg", compact ? "text-xl md:text-2xl" : "text-3xl md:text-4xl")}>{hero.name}</h3>
          <p className={cn("mt-1 text-cream/85", compact ? "text-[0.7rem]" : "text-sm")}>{hero.birthYear} – {hero.deathYear}</p>
        </div>
      </div>

      {/* Info grid */}
      <div className={cn("grid grid-cols-2", compact ? "p-3 gap-2" : "p-6 gap-3")}>
        {[
          { icon: MapPin, label: "Asal", value: hero.birthPlace },
          { icon: Sword, label: "Senjata Utama", value: hero.mainWeapon },
          { icon: Flame, label: "Gaya Perang", value: hero.fightingStyle },
          { icon: Skull, label: "Wafat", value: String(hero.deathYear) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className={cn("bg-muted/50 rounded-xl", compact ? "p-2" : "p-3") }>
            <p className={cn("flex items-center gap-1 uppercase tracking-widest font-cinzel", themeText, compact ? "text-[0.55rem]" : "text-[0.7rem]")}>
              <Icon className="h-3 w-3" /> {label}
            </p>
            <p className={cn("font-medium mt-0.5 text-foreground leading-tight", compact ? "text-[0.7rem]" : "text-sm")}>{value}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className={cn(compact ? "px-3 pb-1" : "px-6 pb-2") }>
        <p className={cn("font-cinzel tracking-[0.3em] uppercase", themeText, compact ? "text-[0.55rem] mb-2" : "text-xs mb-3")}>Kekuatan</p>
        <div className={cn(compact ? "space-y-1.5" : "space-y-3") }>
          {hero.stats.map((s, i) => (
            <div key={s.label}>
              <div className={cn("flex justify-between mb-0.5", compact ? "text-[0.65rem]" : "text-xs mb-1")}>
                <span className="text-foreground/80">{s.label}</span>
                <span className={cn("font-semibold", themeText)}>{s.value}%</span>
              </div>
              <div className={cn("rounded-full bg-muted overflow-hidden", compact ? "h-1" : "h-1.5") }>
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
      <div className={cn(compact ? "px-3 py-3" : "px-6 py-5") }>
        <p className={cn("font-cinzel tracking-[0.3em] uppercase", themeText, compact ? "text-[0.55rem] mb-2" : "text-xs mb-3")}>Fakta Unik</p>
        <ul className={cn(compact ? "space-y-1" : "space-y-1.5") }>
          {hero.uniqueFacts.slice(0, compact ? 3 : 4).map((f) => (
            <li key={f.title} className={cn("flex gap-1.5 text-foreground/85", compact ? "text-[0.7rem]" : "text-sm")}>
              <Dot className={cn("h-5 w-5 shrink-0 -ml-1", themeText)} />
              <span className="leading-snug">{f.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn("mt-auto", compact ? "p-3 pt-1" : "p-6 pt-2") }>
        <Link
          to={`/${hero.slug}`}
          className={cn(
            "flex items-center justify-center gap-2 w-full rounded-xl font-cinzel tracking-[0.2em] uppercase transition-all duration-300",
            compact ? "py-2.5 text-[0.65rem]" : "py-3.5 text-sm",
            themeBtn,
          )}
        >
          Baca Kisah Lengkap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};
