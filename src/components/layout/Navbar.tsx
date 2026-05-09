import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/cut-nyak-dhien", label: "Cut nyak dhien" },
  { to: "/teuku-umar", label: "Teuku Umar" },
  { to: "/perbandingan", label: "Perbandingan" },
  { to: "/game", label: "Game" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" && document.documentElement.classList.contains("dark"),
  );
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-gold shadow-gold transition-transform group-hover:scale-110">
            <Swords className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="font-cinzel text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-foreground">
            Pahlawan Aceh
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground",
                  "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:bg-gradient-gold after:transition-all after:duration-300",
                  isActive ? "after:w-8" : "after:w-0 hover:after:w-6",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label="Ubah tema"
            className="grid place-items-center h-10 w-10 rounded-full bg-muted/60 hover:bg-muted transition-colors"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden grid place-items-center h-10 w-10 rounded-full bg-muted/60"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-3 rounded-lg text-base font-medium transition",
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-muted/60",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
