import { Link } from "react-router-dom";
import { ArrowRight, GitCompareArrows } from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

export const CtaSection = ({ hero }: { hero: HeroData }) => {
  const otherSlug = hero.slug === "cut-nyak-dien" ? "teuku-umar" : "cut-nyak-dien";
  const otherName = hero.slug === "cut-nyak-dhien" ? "Teuku Umar" : "Cut nyak dhien";
  const gold = hero.colorTheme === "gold";

  return (
    <section className="py-24 bg-cream-dark">
      <div className="container max-w-4xl text-center">
        <h2 className="heading-display text-3xl md:text-4xl mb-4">
          Telusuri lebih lanjut perjuangan pahlawan Aceh
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Kenali sosok pasangan dan jelajahi seluruh perbandingan kedua pahlawan.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to={`/${otherSlug}`}
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-cinzel text-sm tracking-[0.2em] uppercase transition-transform hover:scale-105 shadow-elegant",
              gold ? "bg-gradient-maroon text-secondary-foreground" : "bg-gradient-gold text-primary-foreground",
            )}
          >
            Kisah {otherName} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/perbandingan"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-cinzel text-sm tracking-[0.2em] uppercase hover:scale-105 transition-transform"
          >
            <GitCompareArrows className="h-4 w-4" /> Lihat Perbandingan
          </Link>
        </div>
      </div>
    </section>
  );
};
