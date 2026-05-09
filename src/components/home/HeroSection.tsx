import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/perang1.jpg";

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-hero" />
    </div>

    <div className="relative z-10 container text-center text-cream pt-24 pb-16">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-light mb-6"
      >
        Dua Pahlawan, Satu Tujuan
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="font-playfair font-bold leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] mb-8"
      >
        Pahlawan <span className="italic text-gradient-gold">Aceh</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="max-w-2xl mx-auto text-lg md:text-xl text-cream/85 leading-relaxed"
      >
        Mengenang perjuangan abadi <em>Cut nyak dhien</em> dan <em>Teuku Umar</em> —
        dua jiwa, satu semangat melawan penjajahan demi merdeka.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/70"
      >
        <span className="font-cinzel text-[0.65rem] tracking-[0.3em] uppercase">Gulir</span>
        <ChevronDown className="h-5 w-5 animate-bounce-slow" />
      </motion.div>
    </div>
  </section>
);
