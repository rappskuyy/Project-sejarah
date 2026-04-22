import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroData } from "@/types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const TimelineSection = ({ hero }: { hero: HeroData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gold = hero.colorTheme === "gold";

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-eyebrow mb-3">Kronologi</p>
          <h2 className="heading-display text-4xl md:text-5xl mb-4">
            Perjalanan <span className="italic">Hidup</span>
          </h2>
          <p className="text-muted-foreground">
            Ikuti perjalanan heroik yang penuh lika-liku dari seorang putra/putri Aceh
            hingga menjadi simbol perlawanan terkuat bangsa.
          </p>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Center line track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-border" aria-hidden />
          {/* Animated line */}
          <div
            ref={lineRef}
            className={cn(
              "absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-px",
              gold ? "bg-gradient-to-b from-gold via-gold-light to-gold" : "bg-gradient-to-b from-maroon via-maroon-light to-maroon",
            )}
            aria-hidden
          />

          <div className="space-y-10 md:space-y-16">
            {hero.timeline.map((evt, i) => {
              const isLeft = evt.side === "left";
              return (
                <div key={i} className="relative md:grid md:grid-cols-2 md:gap-12 items-start">
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-10">
                    <span className={cn("block h-4 w-4 rounded-full ring-4 ring-cream", gold ? "bg-gold" : "bg-maroon")} />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className={cn(
                      "ml-16 md:ml-0 rounded-2xl p-6 md:p-8 shadow-card",
                      isLeft ? "md:col-start-1 bg-cream-dark border border-border" : "md:col-start-2 bg-brown-dark text-cream",
                    )}
                  >
                    <p
                      className={cn(
                        "font-playfair text-3xl md:text-4xl font-bold mb-2",
                        isLeft ? (gold ? "text-gold-dark" : "text-maroon-dark") : (gold ? "text-gold-light" : "text-maroon-light"),
                      )}
                    >
                      {evt.year}
                    </p>
                    <h3 className={cn("font-semibold text-lg mb-2", isLeft ? "text-foreground" : "text-cream")}>
                      {evt.title}
                    </h3>
                    <div className={cn("h-px w-12 mb-4", gold ? "bg-gold" : "bg-maroon-light")} />
                    <p className={cn("text-sm leading-relaxed", isLeft ? "text-foreground/80" : "text-cream/85")}>
                      {evt.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
