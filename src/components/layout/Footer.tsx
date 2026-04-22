import { Link } from "react-router-dom";
import { Swords, Heart } from "lucide-react";

export const Footer = () => (
  <footer className="bg-brown-dark text-cream/80 mt-24">
    <div className="container py-14 grid gap-10 md:grid-cols-3">
      <div>
        <Link to="/" className="flex items-center gap-2.5 mb-4">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-gold shadow-gold">
            <Swords className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="font-cinzel text-base font-semibold tracking-[0.25em] uppercase text-cream">
            Pahlawan Aceh
          </span>
        </Link>
        <p className="text-sm leading-relaxed max-w-sm">
          Mengenang dua pahlawan legendaris Aceh — Cut Nyak Dien dan Teuku Umar —
          yang berjuang demi kemerdekaan tanah air dengan semangat dan strategi yang abadi.
        </p>
      </div>

      <div>
        <h4 className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-light mb-4">
          Jelajahi
        </h4>
        <ul className="space-y-2 text-sm">
          {[
            { to: "/", label: "Beranda" },
            { to: "/cut-nyak-dien", label: "Cut Nyak Dien" },
            { to: "/teuku-umar", label: "Teuku Umar" },
            { to: "/perbandingan", label: "Perbandingan" },
            { to: "/game", label: "Game Pesawat" },
          ].map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-gold-light transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-light mb-4">
          Tentang
        </h4>
        <p className="text-sm leading-relaxed">
          Situs ini dibuat sebagai penghormatan dan media edukasi tentang perjuangan
          pahlawan Aceh untuk kemerdekaan Indonesia.
        </p>
      </div>
    </div>

    <div className="border-t border-cream/10">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/60">
        <p>© {new Date().getFullYear()} Pahlawan Aceh. Untuk mengenang jasa para pahlawan.</p>
        <p className="flex items-center gap-1.5">
          Dibuat dengan <Heart className="h-3.5 w-3.5 text-maroon-light fill-current" /> untuk Indonesia
        </p>
      </div>
    </div>
  </footer>
);
