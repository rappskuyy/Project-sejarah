import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

export const GallerySection = ({ hero }: { hero: HeroData }) => {
  const [idx, setIdx] = useState(0);
  const gold = hero.colorTheme === "gold";
  const items = hero.gallery;
  const next = () => setIdx((i) => (i + 1) % items.length);
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);

  return (
    <section className="py-24 md:py-32 bg-brown-dark text-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className={cn("font-cinzel text-xs tracking-[0.35em] uppercase mb-3", gold ? "text-gold-light" : "text-maroon-light")}>
            Dokumentasi Visual
          </p>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl">
            Galeri Perjuangan <span className="italic text-gradient-gold">{hero.name}</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-elegant">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img src={items[idx].image} alt={items[idx].title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/95 via-brown-dark/30 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 max-w-xl">
                  <p className={cn("font-cinzel text-[0.7rem] tracking-[0.3em] uppercase mb-2", gold ? "text-gold-light" : "text-maroon-light")}>
                    {items[idx].category}
                  </p>
                  <h3 className="font-playfair text-2xl md:text-4xl font-bold text-cream">{items[idx].title}</h3>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              aria-label="Sebelumnya"
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-cream/90 hover:bg-cream text-brown-dark transition shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Berikutnya"
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-cream/90 hover:bg-cream text-brown-dark transition shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === idx ? (gold ? "w-10 bg-gold" : "w-10 bg-maroon-light") : "w-2 bg-cream/30",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
