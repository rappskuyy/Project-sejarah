import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { HeroCard } from "@/components/home/HeroCard";
import { cutNyakDienData } from "@/lib/data/cutNyakDien";
import { teukuUmarData } from "@/lib/data/teukuUmar";
import { comparisonRows, similarities } from "@/lib/data/comparison";
import { cn } from "@/lib/utils";
import forest from "@/assets/forest-quote.jpg";
import { MissionTimer } from "@/components/home/MissionTimer";

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const C = (Icons as any)[name] ?? Icons.Star;
  return <C className={className} />;
};

const ComparisonPage = () => {
  const [tab, setTab] = useState<"compare" | "same">("compare");
  useEffect(() => { document.title = "Perbandingan — Pahlawan Aceh"; }, []);

  return (
    <>
      <MissionTimer missionKey="strategi" missionLabel="Strategi Perang" />

      <section className="pt-32 pb-16 bg-background">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="label-eyebrow mb-3">Dua Pahlawan, Satu Tujuan</p>
          <h1 className="heading-display text-4xl md:text-6xl mb-5">
            Perbandingan <span className="italic text-gradient-gold">Interaktif</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            Jelajahi perbedaan dan persamaan dua pahlawan Aceh yang berjuang bersama demi
            kemerdekaan bangsa.
          </p>

          <div className="inline-flex p-1.5 rounded-full bg-muted">
            {[
              { id: "compare", label: "Perbandingan" },
              { id: "same", label: "Persamaan" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-cinzel tracking-widest uppercase transition-all",
                  tab === t.id
                    ? "bg-gradient-gold text-primary-foreground shadow-gold"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {tab === "compare" ? (
        <section className="pb-24">
          <div className="container max-w-3xl">
            <div className="grid md:grid-cols-2 gap-3 md:gap-4 items-stretch">
              <HeroCard hero={cutNyakDienData} compact />
              <HeroCard hero={teukuUmarData} compact />
            </div>

            <div className="mt-10 rounded-2xl overflow-hidden bg-brown-dark text-cream shadow-elegant max-w-3xl mx-auto">
              <div className="grid grid-cols-3 text-[0.65rem] md:text-xs font-cinzel tracking-[0.2em] uppercase border-b border-cream/10">
                <div className="p-3 text-gold-light text-center md:text-left md:pl-5">Cut Nyak Dien</div>
                <div className="p-3 text-cream/70 text-center">Aspek</div>
                <div className="p-3 text-maroon-light text-center md:text-right md:pr-5">Teuku Umar</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div key={row.aspect} className={`grid grid-cols-3 text-xs md:text-sm ${i % 2 ? "bg-brown-medium/30" : ""}`}>
                  <div className="p-3 text-gold-light text-center md:text-left md:pl-5">{row.cnd}</div>
                  <div className="p-3 text-cream/60 text-center font-cinzel text-[0.6rem] uppercase tracking-wider">{row.aspect}</div>
                  <div className="p-3 text-maroon-light text-center md:text-right md:pr-5">{row.tu}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="pb-24">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={cutNyakDienData.portrait} alt="" className="h-16 w-16 rounded-full object-cover ring-2 ring-gold" />
              <span className="grid place-items-center h-10 w-10 rounded-full bg-gradient-gold shadow-gold">
                <Icons.Heart className="h-5 w-5 text-primary-foreground fill-current" />
              </span>
              <img src={teukuUmarData.portrait} alt="" className="h-16 w-16 rounded-full object-cover ring-2 ring-maroon" />
            </div>
            <p className="text-center max-w-2xl mx-auto text-muted-foreground mb-12">
              Meski berbeda dalam gaya dan peran, keduanya bersatu dalam satu misi mulia:
              membebaskan Aceh dari penjajahan.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similarities.map((s, i) => (
                <motion.div
                  key={s.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-card hover:-translate-y-1 transition-transform"
                >
                  <div className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-gold text-primary-foreground shrink-0">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </div>
                  <p className="font-medium">{s.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="relative mt-16 rounded-3xl overflow-hidden">
              <img src={forest} alt="" className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-brown-dark/75 grid place-items-center px-6 text-center">
                <div>
                  <Icons.Quote className="h-7 w-7 text-gold-light mx-auto mb-4" />
                  <blockquote className="font-playfair italic text-xl md:text-2xl text-cream max-w-3xl">
                    "Bersama mereka berjuang, bersama mereka menginspirasi —
                    dua jiwa, satu perjuangan abadi."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ComparisonPage;