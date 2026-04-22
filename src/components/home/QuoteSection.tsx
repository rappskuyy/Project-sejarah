import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import bg from "@/assets/forest-quote.jpg";

export const QuoteSection = () => (
  <section className="relative py-32 md:py-44 overflow-hidden">
    <div className="absolute inset-0">
      <img src={bg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-brown-dark/80" />
    </div>

    <div className="relative container max-w-4xl text-center text-cream">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid place-items-center h-14 w-14 rounded-full bg-gold/20 mx-auto mb-8"
      >
        <Quote className="h-6 w-6 text-gold-light" />
      </motion.div>

      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-playfair italic text-2xl md:text-4xl lg:text-5xl leading-snug text-cream"
      >
        "Bersama mereka berjuang, bersama mereka menginspirasi —
        <br className="hidden md:block" />
        dua jiwa, satu perjuangan abadi."
      </motion.blockquote>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12"
      >
        <Link
          to="/perbandingan"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-primary-foreground font-cinzel text-sm tracking-[0.2em] uppercase shadow-gold hover:scale-105 transition-transform"
        >
          Jelajahi Perbandingan Lengkap <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);
