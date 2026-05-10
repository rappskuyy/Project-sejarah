import { Link } from "react-router-dom";
import { Swords, Heart, ExternalLink, Users } from "lucide-react";

export const Footer = () => {
  // Data Pembuat
  const creators = [
    { name: "Muhamad Fedliansyah Ilham", url: "https://mfedliansyahilham.my.id/" },
    { name: "Raffasya Javas Niscala Widjaja", url: "https://rappskuyy.my.id/" },
    { name: "Anugrah Mulya Setiyawan", url: "" },
  ];

  return (
    <footer className="bg-brown-dark text-cream/80 mt-24">
      <div className="container py-14 grid gap-10 md:grid-cols-3">
        {/* Kolom 1: Profil Pengembang */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-gold shadow-gold">
              <Swords className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <span className="font-cinzel text-base font-semibold tracking-[0.25em] uppercase text-cream">
              Pahlawan Aceh
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm mb-5">
            Website ini dikembangkan secara kolaboratif untuk menghidupkan kembali 
            kisah heroik perjuangan Aceh melalui pengalaman digital yang modern.
          </p>
          
          <div className="space-y-3">
            <h5 className="text-[10px] uppercase tracking-widest text-gold-light/60 font-semibold flex items-center gap-2">
              <Users className="h-3 w-3" /> Tim Pengembang
            </h5>
            <div className="flex flex-col gap-2">
              {creators.map((creator, index) => (
                <a 
                  key={index}
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold-light hover:text-cream transition-colors group w-fit"
                >
                  <span className="border-b border-gold-light/30 group-hover:border-cream transition-colors">
                    {creator.name}
                  </span>
                  <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom 2: Navigasi */}
        <div>
          <h4 className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-light mb-4">
            Jelajahi
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Beranda" },
              { to: "/cut-nyak-dhien", label: "Cut Nyak Dhien" },
              { to: "/teuku-umar", label: "Teuku Umar" },
              { to: "/perbandingan", label: "Perbandingan Strategi" },
              { to: "/game", label: "Mini Game" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-gold-light transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Tentang Proyek */}
        <div>
          <h4 className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-light mb-4">
            Tentang Proyek
          </h4>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Pahlawan Aceh</strong> adalah platform edukasi independen yang 
              menggabungkan arsip sejarah dengan teknologi web untuk memberikan 
              perspektif baru mengenai taktik perang dan keteguhan hati para pejuang.
            </p>
            <p className="text-xs text-cream/50 italic border-l border-gold-light/30 pl-3">
              Dedikasi untuk literasi sejarah Indonesia di era digital.
            </p>
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Copyright */}
      <div className="border-t border-cream/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Pahlawan Aceh. Dikelola untuk tujuan edukasi.</p>
          <div className="flex items-center gap-1.5 bg-brown-light/20 px-3 py-1 rounded-full border border-cream/5">
            Dibuat oleh 
            <span className="text-cream/80 font-medium">
              {creators[0].name} & {creators[1].name} & {creators[2].name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};