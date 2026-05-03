import { useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Flag, MapPin, Maximize2, Minus, Plus, Route, Shield, Sparkles, Target } from "lucide-react";
import acehGeoJson from "@/lib/data/acehAdm2";

type GeoFeature = {
  type: "Feature";
  properties: { shapeName: string };
  geometry: { type: string; coordinates: unknown };
};

type HistoricalEvent = {
  id: string;
  year: string;
  title: string;
  location: string;
  region: string;
  text: string;
  focus: [number, number];
};

const events: HistoricalEvent[] = [
  {
    id: "banda-aceh",
    year: "1873",
    title: "Perang Aceh Dimulai",
    location: "Banda Aceh",
    region: "Kota Banda Aceh",
    text: "Pusat Kesultanan Aceh menjadi titik awal perlawanan besar terhadap ekspedisi Belanda.",
    focus: [95.32, 5.55],
  },
  {
    id: "aceh-besar",
    year: "1880",
    title: "Lampadang dan Basis Keluarga",
    location: "Lampadang",
    region: "Aceh Besar",
    text: "Wilayah Aceh Besar melekat dengan kisah awal Cut Nyak Dien dan jaringan perjuangan keluarganya.",
    focus: [95.43, 5.47],
  },
  {
    id: "aceh-barat",
    year: "1896",
    title: "Taktik Teuku Umar",
    location: "Meulaboh",
    region: "Aceh Barat",
    text: "Teuku Umar menggunakan strategi penyamaran, logistik, dan serangan balik dari pesisir barat Aceh.",
    focus: [96.13, 4.14],
  },
  {
    id: "meulaboh",
    year: "1899",
    title: "Gugur di Meulaboh",
    location: "Meulaboh",
    region: "Aceh Barat",
    text: "Teuku Umar gugur dalam pertempuran, tetapi semangat gerilya Aceh terus berlanjut.",
    focus: [96.13, 4.14],
  },
  {
    id: "gayo",
    year: "1908",
    title: "Akhir Perjuangan Cut Nyak Dien",
    location: "Pedalaman Aceh",
    region: "Gayo Lues",
    text: "Perlawanan berlanjut ke wilayah pedalaman sebelum Cut Nyak Dien ditangkap dan diasingkan.",
    focus: [97.35, 3.94],
  },
];

const materials = [
  { icon: BookOpen, title: "Biografi Tokoh", text: "Latar keluarga, masa muda, dan perubahan hidup Cut Nyak Dien serta Teuku Umar.", to: "/cut-nyak-dien" },
  { icon: Shield, title: "Strategi Perang", text: "Gerilya, penguasaan medan, penyamaran, dan cara membangun kepercayaan rakyat.", to: "/perbandingan" },
  { icon: MapPin, title: "Peta Wilayah Aceh", text: "Pelajari batas kabupaten/kota Aceh, lokasi sejarah, dan rute perjuangan melalui peta interaktif.", to: "/teuku-umar" },
  { icon: Sparkles, title: "Fakta Cepat", text: "Ringkasan tanggal, tempat, nilai perjuangan, dan istilah penting untuk persiapan quiz.", to: "/game" },
];

const missions = ["Telusuri peta Aceh", "Klik timeline sejarah", "Baca materi cepat", "Uji pemahaman di game"];
const mapData = acehGeoJson as unknown as { type: "FeatureCollection"; features: GeoFeature[] };
const MAP_WIDTH = 760;
const MAP_HEIGHT = 520;

export const LearningMuseumSection = () => {
  const [activeEvent, setActiveEvent] = useState(events[0]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(events[0].region);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const { path, regionCentroids, eventPoints, routePath } = useMemo(() => {
    const projection = geoMercator().fitSize([MAP_WIDTH, MAP_HEIGHT], mapData as never);
    const generator = geoPath(projection);
    const centroids = new Map<string, [number, number]>();
    const projectedEvents = new Map<string, [number, number]>();

    mapData.features.forEach((feature) => {
      centroids.set(feature.properties.shapeName, generator.centroid(feature as never) as [number, number]);
    });

    events.forEach((item) => {
      const point = projection(item.focus);
      if (point) projectedEvents.set(item.id, point as [number, number]);
    });

    const route = events.map((item) => projectedEvents.get(item.id)).filter(Boolean) as [number, number][];

    return {
      path: generator,
      regionCentroids: centroids,
      eventPoints: projectedEvents,
      routePath: route.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" "),
    };
  }, []);

  const mapTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 1.35, ease: [0.16, 1, 0.3, 1] as const };

  const calculateConnectedPan = (point: [number, number]) => {
    const desiredX = MAP_WIDTH / 2 - point[0];
    const desiredY = MAP_HEIGHT / 2 - point[1];
    const maxPanX = MAP_WIDTH * 0.16;
    const maxPanY = MAP_HEIGHT * 0.14;

    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, desiredX)),
      y: Math.max(-maxPanY, Math.min(maxPanY, desiredY)),
    };
  };

  const focusEvent = (item: HistoricalEvent) => {
    const point = eventPoints.get(item.id) || regionCentroids.get(item.region);
    setActiveEvent(item);
    setSelectedRegion(item.region);
    setZoom(1.34);
    if (point) {
      setPan(calculateConnectedPan(point));
    }
  };

  const resetMap = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedRegion(activeEvent.region);
  };

  const activeRegionEvent = events.find((item) => item.region === (hoveredRegion || selectedRegion));

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="label-eyebrow mb-3">Ruang Belajar Interaktif</p>
          <h2 className="heading-display text-3xl md:text-5xl mb-4">
            Peta Aceh Asli untuk <span className="italic text-gradient-gold">Menelusuri Perjuangan</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Peta ini memakai data GeoJSON wilayah Aceh sehingga bentuknya tetap tajam, bisa di-hover, di-tap, dan mengikuti timeline sejarah.
          </p>
        </div>

        <div className="grid xl:grid-cols-[1.25fr_0.75fr] gap-5 md:gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-card overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-primary mb-1">Real Geographic Map</p>
                <h3 className="font-playfair text-2xl font-bold">Peta Wilayah Aceh</h3>
                <p className="mt-1 text-xs text-muted-foreground">GeoJSON tervalidasi · 23 kabupaten/kota · SVG vektor HD</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setZoom((value) => Math.min(3, value + 0.25))} className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent" aria-label="Perbesar peta">
                  <Plus className="h-4 w-4" />
                </button>
                <button onClick={() => setZoom((value) => Math.max(1, value - 0.25))} className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent" aria-label="Perkecil peta">
                  <Minus className="h-4 w-4" />
                </button>
                <button onClick={resetMap} className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent" aria-label="Reset fokus peta">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[390px] md:min-h-[540px] rounded-xl border border-border bg-accent overflow-hidden touch-pan-y">
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                role="img"
                aria-label="Peta GeoJSON Provinsi Aceh interaktif"
                className="h-full min-h-[390px] md:min-h-[540px] w-full cursor-grab"
                onWheel={(event) => {
                  event.preventDefault();
                  setZoom((value) => Math.min(3, Math.max(1, value + (event.deltaY < 0 ? 0.16 : -0.16))));
                }}
              >
                <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="hsl(var(--accent))" />
                <motion.g animate={{ scale: zoom, x: pan.x, y: pan.y }} transition={mapTransition} style={{ transformOrigin: "center", transformBox: 'fill-box' }}>
                  <path d={routePath} fill="none" stroke="hsl(var(--maroon-dark))" strokeWidth="3" strokeDasharray="9 10" opacity="0.55" strokeLinecap="round" />
                  {mapData.features.map((feature) => {
                    const region = feature.properties.shapeName;
                    const isActive = region === activeEvent.region || region === selectedRegion;
                    const isHovered = region === hoveredRegion;
                    return (
                      <motion.path
                        key={`${region}-${feature.geometry.type}`}
                        d={path(feature as never) || ""}
                        fill={isActive ? "hsl(var(--maroon) / 0.22)" : isHovered ? "hsl(var(--maroon) / 0.16)" : "hsl(var(--maroon) / 0.08)"}
                        stroke={isActive || isHovered ? "hsl(var(--maroon-dark))" : "hsl(var(--maroon-dark) / 0.45)"}
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth={isActive || isHovered ? 1.6 : 0.95}
                        opacity={isActive ? 0.98 : isHovered ? 0.88 : 0.96}
                        className="outline-none transition-all duration-300"
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => {
                          const event = events.find((item) => item.region === region);
                          setSelectedRegion(region);
                          if (event) focusEvent(event);
                        }}
                        whileHover={{ scale: 1.004 }}
                      />
                    );
                  })}
                  {events.map((item) => {
                    const point = eventPoints.get(item.id) || regionCentroids.get(item.region);
                    if (!point) return null;
                    const isActive = item.id === activeEvent.id;
                    return (
                      <g key={item.id} transform={`translate(${point[0]} ${point[1]})`} onClick={() => focusEvent(item)} className="cursor-pointer">
                        <motion.circle r={isActive ? 11 : 7} fill="hsl(var(--gold))" stroke="hsl(var(--primary-foreground))" strokeWidth="3" animate={{ scale: isActive ? [1, 1.18, 1] : 1 }} transition={{ duration: 1.8, repeat: isActive ? Infinity : 0 }} />
                      </g>
                    );
                  })}
                </motion.g>
              </svg>

              <motion.div
                key={`${hoveredRegion}-${activeEvent.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-4 right-4 bottom-4 md:left-6 md:right-auto md:w-80 rounded-xl border border-border bg-popover/95 p-4 text-popover-foreground shadow-elegant backdrop-blur"
              >
                <p className="font-cinzel text-[0.65rem] tracking-[0.24em] uppercase text-primary mb-1">{hoveredRegion || activeEvent.location}</p>
                <h4 className="font-playfair text-xl font-bold">{activeRegionEvent?.title || "Wilayah Aceh"}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{activeRegionEvent?.text || "Klik area pada peta untuk memilih kabupaten/kota Aceh."}</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-primary mb-1">Timeline Terhubung</p>
                <h3 className="font-playfair text-2xl font-bold">Klik Tahun</h3>
              </div>
              <Flag className="h-7 w-7 text-primary" />
            </div>
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {events.map((item) => {
                const isActive = item.id === activeEvent.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => focusEvent(item)}
                    className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${isActive ? "border-maroon bg-accent shadow-card" : "border-border bg-background hover:bg-accent/70"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 rounded-lg px-3 py-2 text-center font-cinzel text-xs tracking-widest ${isActive ? "bg-gradient-maroon text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {item.year}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="mt-1 flex items-center gap-1.5 text-xs font-cinzel tracking-wider uppercase text-primary">
                          <MapPin className="h-3.5 w-3.5" /> {item.location}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.78fr] gap-5 md:gap-6 mt-5 md:mt-6">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {materials.map(({ icon: Icon, title, text, to }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{text}</p>
                <Link to={to} className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.18em] uppercase text-primary hover:text-primary-deep transition-colors">
                  Buka Materi <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-xl border border-border bg-brown-dark p-5 text-cream shadow-elegant"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="font-cinzel text-[0.65rem] tracking-[0.28em] uppercase text-gold-light">Misi Belajar</p>
              <Route className="h-6 w-6 text-gold-light" />
            </div>
            <div className="space-y-3 mb-5">
              {missions.map((mission, index) => (
                <div key={mission} className="flex items-center gap-3 rounded-lg bg-cream/10 border border-cream/10 px-3 py-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold-light shrink-0" />
                  <span className="text-sm font-medium">{index + 1}. {mission}</span>
                </div>
              ))}
            </div>
            <Link to="/perbandingan" className="inline-flex items-center gap-2 text-sm font-cinzel tracking-[0.18em] uppercase text-gold-light hover:text-cream transition-colors">
              Mulai dari perbandingan <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
