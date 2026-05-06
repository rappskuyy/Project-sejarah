import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Periodic glitch trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const particles = Array.from({ length: 24 }, (_, i) => i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

        :root {
          --gold: #FFD682;
          --gold-light: #FFE8A3;
          --gold-dim: #C9A84C;
          --cream: #FCE4C0;
          --brown-dark: #1A0E06;
          --brown-medium: #2D1A0A;
          --maroon: #801222;
          --maroon-light: #C4364A;
        }

        @keyframes float-particle {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-120vh) translateX(var(--drift)) rotate(720deg); opacity: 0; }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        @keyframes glitch-1 {
          0% { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
          20% { clip-path: inset(40% 0 50% 0); transform: translate(4px, 0); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
          60% { clip-path: inset(20% 0 70% 0); transform: translate(3px, 0); }
          80% { clip-path: inset(55% 0 30% 0); transform: translate(-3px, 0); }
          100% { clip-path: inset(0 0 95% 0); transform: translate(0, 0); }
        }

        @keyframes glitch-2 {
          0% { clip-path: inset(80% 0 5% 0); transform: translate(4px, 0); color: var(--maroon-light); }
          25% { clip-path: inset(10% 0 75% 0); transform: translate(-4px, 0); }
          50% { clip-path: inset(50% 0 35% 0); transform: translate(2px, 0); color: var(--gold-light); }
          75% { clip-path: inset(25% 0 60% 0); transform: translate(-2px, 0); }
          100% { clip-path: inset(80% 0 5% 0); transform: translate(0, 0); color: var(--maroon-light); }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes compass-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255,214,130,0.2), inset 0 0 10px rgba(255,214,130,0.05); }
          50% { box-shadow: 0 0 30px rgba(255,214,130,0.5), inset 0 0 20px rgba(255,214,130,0.1); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }

        @keyframes rune-appear {
          0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(2deg); }
          100% { opacity: 0.15; transform: scale(1) rotate(0deg); }
        }

        .glitch-text { position: relative; }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          opacity: 0;
          pointer-events: none;
        }
        .glitch-text.active::before {
          opacity: 1;
          color: var(--maroon-light);
          animation: glitch-1 0.4s steps(1) forwards;
        }
        .glitch-text.active::after {
          opacity: 1;
          color: var(--gold-light);
          animation: glitch-2 0.4s steps(1) forwards;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          animation: float-particle linear infinite;
          pointer-events: none;
        }

        .pulse-ring {
          position: absolute;
          border-radius: 50%;
          animation: pulse-ring 3s ease-out infinite;
          pointer-events: none;
        }

        .animate-fade-up-1 { animation: fade-up 0.8s ease forwards; opacity: 0; }
        .animate-fade-up-2 { animation: fade-up 0.8s 0.15s ease forwards; opacity: 0; }
        .animate-fade-up-3 { animation: fade-up 0.8s 0.3s ease forwards; opacity: 0; }
        .animate-fade-up-4 { animation: fade-up 0.8s 0.45s ease forwards; opacity: 0; }
        .animate-fade-up-5 { animation: fade-up 0.8s 0.6s ease forwards; opacity: 0; }
        .animate-fade-up-6 { animation: fade-up 0.8s 0.75s ease forwards; opacity: 0; }

        .shimmer-text {
          background: linear-gradient(90deg, var(--gold-dim) 0%, var(--gold-light) 30%, #fff 50%, var(--gold-light) 70%, var(--gold-dim) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .border-glow-anim { animation: border-glow 3s ease-in-out infinite; }

        .float-anim { animation: float-slow 5s ease-in-out infinite; }

        .scanline {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,214,130,0.08), transparent);
          animation: scanline 6s linear infinite;
          pointer-events: none;
        }

        .compass-ring {
          animation: compass-spin 20s linear infinite;
        }

        .btn-gold {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-gold::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .btn-gold:hover::before { transform: translateX(100%); }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,214,130,0.4); }

        .btn-outline {
          transition: all 0.3s ease;
          position: relative;
        }
        .btn-outline:hover {
          transform: translateY(-2px);
          background: rgba(255,214,130,0.08);
          border-color: rgba(255,214,130,0.5);
          box-shadow: 0 0 20px rgba(255,214,130,0.15);
        }

        .card-hover {
          transition: all 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(255,214,130,0.35);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,214,130,0.1);
        }

        .rune { animation: rune-appear 4s ease forwards; }
      `}</style>

      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: 'var(--brown-dark)', color: 'var(--cream)', fontFamily: "'Crimson Pro', serif" }}
      >
        {/* Scanline */}
        <div className="scanline" />

        {/* Deep background radial */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 20%, rgba(255,214,130,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(128,18,34,0.12) 0%, transparent 50%)'
        }} />

        {/* Subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,214,130,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,130,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Floating particles */}
        {particles.map((i) => {
          const size = Math.random() * 4 + 1;
          const left = Math.random() * 100;
          const delay = Math.random() * 15;
          const duration = Math.random() * 12 + 10;
          const drift = (Math.random() - 0.5) * 200;
          const isGold = Math.random() > 0.5;
          return (
            <div
              key={i}
              className="particle"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: '-10px',
                background: isGold ? 'var(--gold)' : 'var(--maroon-light)',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                '--drift': `${drift}px`,
                opacity: 0,
                boxShadow: isGold ? '0 0 6px rgba(255,214,130,0.8)' : '0 0 6px rgba(196,54,74,0.8)',
              } as React.CSSProperties}
            />
          );
        })}

        {/* Parallax decorative runes / letters background */}
        <div
          className="pointer-events-none absolute inset-0 select-none"
          style={{
            transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {['ك', 'ع', 'ح', 'س', 'ل', 'ا', 'م', 'ن'].map((char, i) => (
            <div
              key={i}
              className="rune absolute text-6xl md:text-8xl font-black"
              style={{
                color: i % 2 === 0 ? 'rgba(255,214,130,0.08)' : 'rgba(128,18,34,0.08)',
                left: `${[5, 15, 75, 85, 25, 60, 40, 90][i]}%`,
                top: `${[10, 60, 15, 55, 80, 30, 45, 75][i]}%`,
                animationDelay: `${i * 0.5}s`,
                fontSize: `${[80, 60, 100, 70, 90, 65, 85, 55][i]}px`,
              }}
            >
              {char}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 sm:px-8 lg:px-12">

          {/* Top badge */}
          <div className="animate-fade-up-1 mb-8 flex items-center gap-3">
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
            <p style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}>
              Halaman Tak Ditemukan
            </p>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          </div>

          {/* 404 Hero */}
          <div className="animate-fade-up-2 relative flex items-center justify-center mb-8">
            {/* Pulse rings */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="pulse-ring"
                style={{
                  width: 180,
                  height: 180,
                  border: '1px solid rgba(255,214,130,0.3)',
                  animationDelay: `${i * 1}s`,
                  animationDuration: '3s',
                }}
              />
            ))}

            {/* Compass outer ring */}
            <div
              className="compass-ring absolute"
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '1px solid rgba(255,214,130,0.15)',
                backgroundImage: `conic-gradient(from 0deg, rgba(255,214,130,0.05), rgba(255,214,130,0.15), rgba(255,214,130,0.05), rgba(255,214,130,0.15), rgba(255,214,130,0.05))`,
              }}
            />

            {/* 404 number */}
            <div
              className={`float-anim relative z-10 flex items-center justify-center rounded-full border-2 glitch-text ${glitchActive ? 'active' : ''}`}
              data-text="404"
              style={{
                width: 160,
                height: 160,
                borderColor: 'rgba(255,214,130,0.5)',
                background: 'radial-gradient(circle, rgba(45,26,10,0.95) 60%, rgba(26,14,6,0.8))',
                boxShadow: '0 0 60px rgba(255,214,130,0.15), inset 0 0 40px rgba(0,0,0,0.5)',
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: '52px',
                fontWeight: '900',
                color: 'var(--gold)',
                letterSpacing: '0.1em',
                textShadow: '0 0 20px rgba(255,214,130,0.6)',
                userSelect: 'none',
              }}
            >
              404
            </div>
          </div>

          {/* Headline */}
          <div className="animate-fade-up-3 text-center mb-4">
            <h1
              className="shimmer-text"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: '700',
                letterSpacing: '0.08em',
                lineHeight: 1.2,
              }}
            >
              Jejak Hilang di Rimba Sejarah
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="animate-fade-up-4 mx-auto mb-12 max-w-xl text-center leading-8"
            style={{ color: 'rgba(252,228,192,0.7)', fontSize: '16px', letterSpacing: '0.02em' }}
          >
            Jejakmu melintas ke wilayah tak dikenal. Kembali ke jalur utama dan lanjutkan petualangan sejarah Aceh.
          </p>

          {/* Cards */}
          <div className="animate-fade-up-5 grid w-full gap-6 lg:grid-cols-[1.5fr_1fr]">

            {/* Left card — main */}
            <div
              className="card-hover border-glow-anim relative overflow-hidden rounded-[2rem] p-8 sm:p-10"
              style={{
                border: '1px solid rgba(255,214,130,0.2)',
                background: 'rgba(45,26,10,0.85)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Decorative corner accents */}
              {[
                { top: -1, left: -1, borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', borderRadius: '2rem 0 0 0' },
                { top: -1, right: -1, borderTop: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', borderRadius: '0 2rem 0 0' },
                { bottom: -1, left: -1, borderBottom: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', borderRadius: '0 0 0 2rem' },
                { bottom: -1, right: -1, borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', borderRadius: '0 0 2rem 0' },
              ].map((style, i) => (
                <div key={i} className="pointer-events-none absolute" style={{ ...style, width: 32, height: 32 }} />
              ))}

              {/* Glow blobs */}
              <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full blur-3xl" style={{ background: 'rgba(255,214,130,0.08)' }} />
              <div className="pointer-events-none absolute -right-8 bottom-8 h-24 w-24 rounded-full blur-3xl" style={{ background: 'rgba(128,18,34,0.15)' }} />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="space-y-3">
                  <p style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: '10px',
                    letterSpacing: '0.35em',
                    color: 'var(--maroon-light)',
                    textTransform: 'uppercase',
                  }}>
                    Kamu tersesat di peta
                  </p>
                  <h2 style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    fontWeight: '700',
                    color: 'var(--cream)',
                    lineHeight: 1.4,
                    letterSpacing: '0.02em',
                  }}>
                    Banyak cerita hebat menunggu di halaman lain.
                  </h2>
                  <p style={{ color: 'rgba(252,228,192,0.75)', fontSize: '15px', lineHeight: 1.8 }}>
                    Gunakan tombol di bawah untuk kembali ke rumah, menelusuri game, atau melihat kisah pahlawan Aceh.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/"
                    className="btn-gold inline-flex w-full items-center justify-center rounded-full px-6 py-3 sm:w-auto"
                    style={{
                      background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)',
                      color: 'var(--brown-dark)',
                      fontFamily: "'Cinzel Decorative', serif",
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.2em',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                    }}
                  >
                    ← Kembali ke Beranda
                  </Link>
                  <Link
                    to="/game"
                    className="btn-outline inline-flex w-full items-center justify-center rounded-full border px-6 py-3 sm:w-auto"
                    style={{
                      borderColor: 'rgba(252,228,192,0.25)',
                      color: 'var(--cream)',
                      fontFamily: "'Cinzel Decorative', serif",
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.2em',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                    }}
                  >
                    Jelajahi Game →
                  </Link>
                </div>

                {/* Info cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      label: 'Rute Alternatif',
                      color: 'var(--gold-light)',
                      borderColor: 'rgba(255,214,130,0.2)',
                      text: 'Kembali ke beranda atau lanjutkan ke permainan untuk bertemu pahlawan Aceh dalam misi baru.',
                    },
                    {
                      label: 'Jejak Sejarah',
                      color: 'var(--maroon-light)',
                      borderColor: 'rgba(128,18,34,0.25)',
                      text: 'Halaman ini tidak tersedia, tetapi semangat Cut Nyak Dien dan Teuku Umar tetap hidup di setiap tautan.',
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="card-hover rounded-2xl p-5 text-left"
                      style={{
                        border: `1px solid ${card.borderColor}`,
                        background: 'rgba(252,228,192,0.04)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <p style={{
                        fontFamily: "'Cinzel Decorative', serif",
                        fontSize: '9px',
                        letterSpacing: '0.3em',
                        color: card.color,
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}>
                        {card.label}
                      </p>
                      <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(252,228,192,0.75)' }}>
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right card — visual */}
            <div
              className="card-hover relative flex items-center justify-center overflow-hidden rounded-[2rem] p-8 sm:p-10"
              style={{
                border: '1px solid rgba(128,18,34,0.25)',
                background: 'rgba(26,14,6,0.7)',
                backdropFilter: 'blur(20px)',
                minHeight: '360px',
              }}
            >
              {/* BG radial */}
              <div className="pointer-events-none absolute inset-0" style={{
                background: 'radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at bottom left, rgba(128,18,34,0.15), transparent 50%)'
              }} />

              {/* Orbiting dots */}
              {[0, 90, 180, 270].map((deg, i) => (
                <div
                  key={i}
                  className="pointer-events-none absolute"
                  style={{
                    width: 260,
                    height: 260,
                    borderRadius: '50%',
                    border: '1px dashed rgba(255,214,130,0.1)',
                    animation: `compass-spin ${20 + i * 5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? 'var(--gold)' : 'var(--maroon-light)',
                    top: -3,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(255,214,130,0.8)' : 'rgba(196,54,74,0.8)'}`,
                  }} />
                </div>
              ))}

              {/* Center medallion */}
              <div className="float-anim relative z-10 flex flex-col items-center gap-5">
                <div
                  className="relative flex items-center justify-center rounded-full"
                  style={{
                    width: 140,
                    height: 140,
                    border: '2px solid rgba(255,214,130,0.5)',
                    background: 'radial-gradient(circle, rgba(45,26,10,0.95) 0%, rgba(26,14,6,1) 100%)',
                    boxShadow: '0 0 60px rgba(255,214,130,0.2), inset 0 0 30px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Inner ring */}
                  <div style={{
                    position: 'absolute',
                    width: 110,
                    height: 110,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,214,130,0.2)',
                  }} />
                  <span style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: '44px',
                    fontWeight: '900',
                    color: 'var(--gold)',
                    textShadow: '0 0 30px rgba(255,214,130,0.7)',
                    letterSpacing: '-0.02em',
                  }}>
                    ?
                  </span>
                </div>

                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: 'rgba(252,228,192,0.7)',
                  textAlign: 'center',
                  maxWidth: '200px',
                  letterSpacing: '0.02em',
                  fontStyle: 'italic',
                }}>
                  Halaman ini hilang dari sejarah, namun semangat Aceh terus berlanjut di sini.
                </p>

                {/* Decorative separator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 24, height: 1, background: 'rgba(255,214,130,0.3)' }} />
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 6px rgba(255,214,130,0.8)' }} />
                  <div style={{ width: 24, height: 1, background: 'rgba(255,214,130,0.3)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom path indicator */}
          <div className="animate-fade-up-6 mt-10 flex items-center gap-3" style={{ opacity: 0.5 }}>
            <p style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}>
              {location.pathname}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;