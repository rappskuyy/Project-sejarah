import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Award, Star, Scroll } from "lucide-react";
import { saveProgress, loadProgress } from "@/hooks/useMissionProgress";

interface Props {
  open: boolean;
  onClose: () => void;
  onClaimed: () => void;
}

export function CertificateModal({ open, onClose, onClaimed }: Props) {
  const [name, setName] = useState("");
  const [step, setStep] = useState<"form" | "preview">("form");
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const claimedDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

  const handleClaim = () => {
    if (!name.trim()) return;
    const progress = loadProgress();
    progress.certificateClaimed = true;
    progress.claimedAt = new Date().toISOString();
    saveProgress(progress);
    setStep("preview");
    onClaimed();
  };

  const handleDownloadPDF = useCallback(async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      // Dynamically import html2canvas + jsPDF
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#1A0E06",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Sertifikat-Pahlawan-Aceh-${name.replace(/\s+/g, "-")}.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setDownloading(false);
    }
  }, [name]);

  const handleClose = () => {
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(10,5,2,0.92)", backdropFilter: "blur(12px)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-brown-dark text-cream/60 hover:text-cream transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {step === "form" ? (
              /* ── FORM STEP ── */
              <div
                className="rounded-3xl border border-gold/25 p-8 md:p-10 text-cream"
                style={{ background: "linear-gradient(135deg, #2D1A0A 0%, #1A0E06 60%, #3D1518 100%)" }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/50"
                    style={{ background: "radial-gradient(circle, rgba(255,214,130,0.15), transparent)" }}>
                    <Award className="h-9 w-9 text-gold-light" />
                    {[0, 1, 2, 3].map((i) => (
                      <Star
                        key={i}
                        className="absolute h-3 w-3 text-gold"
                        style={{
                          top: `${[2, 2, 65, 65][i]}%`,
                          left: `${[2, 68, 2, 68][i]}%`,
                          opacity: 0.6,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center mb-8">
                  <p className="font-cinzel text-[0.65rem] tracking-[0.4em] uppercase text-gold-light mb-2">
                    Selamat!
                  </p>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
                    Semua Misi Selesai
                  </h2>
                  <p className="text-cream/70 text-sm leading-relaxed max-w-sm mx-auto">
                    Kamu telah menyelesaikan seluruh perjalanan belajar Pahlawan Aceh.
                    Masukkan namamu untuk mencetak sertifikat kehormatan.
                  </p>
                </div>

                {/* Name input */}
                <div className="mb-6">
                  <label className="block font-cinzel text-[0.65rem] tracking-[0.3em] uppercase text-gold-light mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleClaim()}
                    placeholder="Tulis namamu di sini..."
                    maxLength={60}
                    className="w-full rounded-xl border border-cream/20 bg-cream/5 px-5 py-3.5 text-cream placeholder:text-cream/30 font-playfair text-lg focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                  />
                </div>

                <button
                  onClick={handleClaim}
                  disabled={!name.trim()}
                  className="w-full rounded-xl py-4 font-cinzel text-sm tracking-[0.25em] uppercase font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: name.trim()
                      ? "linear-gradient(135deg, #FFD682, #C9A84C)"
                      : "rgba(255,214,130,0.2)",
                    color: name.trim() ? "#1A0E06" : "rgba(255,255,255,0.4)",
                    boxShadow: name.trim() ? "0 8px 30px rgba(255,214,130,0.25)" : "none",
                  }}
                >
                  Cetak Sertifikat →
                </button>
              </div>
            ) : (
              /* ── PREVIEW STEP ── */
              <div className="flex flex-col gap-4">
                {/* Certificate card */}
                <div
                  ref={certRef}
                  className="relative overflow-hidden rounded-2xl text-cream select-none"
                  style={{
                    background: "linear-gradient(135deg, #1A0E06 0%, #2D1A0A 40%, #3D1518 100%)",
                    border: "1px solid rgba(255,214,130,0.3)",
                    aspectRatio: "1.414 / 1",
                    padding: "clamp(24px, 5%, 48px)",
                  }}
                >
                  {/* Corner ornaments */}
                  {[
                    { top: 0, left: 0, borderTop: "2px solid rgba(255,214,130,0.6)", borderLeft: "2px solid rgba(255,214,130,0.6)", borderRadius: "1rem 0 0 0" },
                    { top: 0, right: 0, borderTop: "2px solid rgba(255,214,130,0.6)", borderRight: "2px solid rgba(255,214,130,0.6)", borderRadius: "0 1rem 0 0" },
                    { bottom: 0, left: 0, borderBottom: "2px solid rgba(255,214,130,0.6)", borderLeft: "2px solid rgba(255,214,130,0.6)", borderRadius: "0 0 0 1rem" },
                    { bottom: 0, right: 0, borderBottom: "2px solid rgba(255,214,130,0.6)", borderRight: "2px solid rgba(255,214,130,0.6)", borderRadius: "0 0 1rem 0" },
                  ].map((s, i) => (
                    <div key={i} className="absolute" style={{ ...s, width: 40, height: 40 }} />
                  ))}

                  {/* Decorative background circles */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(circle at 15% 50%, rgba(255,214,130,0.05) 0%, transparent 40%), radial-gradient(circle at 85% 50%, rgba(128,18,34,0.1) 0%, transparent 40%)"
                  }} />

                  {/* Inner border */}
                  <div className="absolute inset-4 rounded-xl border border-gold/15 pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-3">
                    {/* Scroll icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 mb-1"
                      style={{ background: "rgba(255,214,130,0.1)" }}>
                      <Scroll className="h-6 w-6 text-gold-light" />
                    </div>

                    <p className="font-cinzel text-[0.6rem] tracking-[0.5em] uppercase text-gold/80">
                      Sertifikat Penghargaan
                    </p>

                    <p className="font-cinzel text-[0.55rem] tracking-[0.3em] uppercase text-cream/50">
                      Pahlawan Aceh · Platform Edukasi Sejarah
                    </p>

                    <div className="w-24 h-px my-1" style={{ background: "linear-gradient(90deg, transparent, rgba(255,214,130,0.5), transparent)" }} />

                    <p className="text-cream/60 text-xs font-cinzel tracking-wider">Diberikan kepada</p>

                    <h1
                      className="font-playfair font-bold text-gold-light leading-tight"
                      style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
                    >
                      {name}
                    </h1>

                    <div className="w-24 h-px my-1" style={{ background: "linear-gradient(90deg, transparent, rgba(255,214,130,0.5), transparent)" }} />

                    <p
                      className="text-cream/75 leading-relaxed max-w-md"
                      style={{ fontSize: "clamp(10px, 1.5vw, 13px)" }}
                    >
                      Telah menyelesaikan seluruh misi perjalanan belajar sejarah perjuangan<br />
                      <em>Cut Nyak Dien</em> dan <em>Teuku Umar</em> — pahlawan Aceh yang tak terlupakan.
                    </p>

                    <div className="flex items-center gap-6 mt-2">
                      {["Biografi Tokoh", "Strategi Perang", "Peta Wilayah", "Kuis & Game"].map((label) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                          <div className="h-5 w-5 rounded-full border border-gold/40 bg-gold/15 flex items-center justify-center">
                            <span className="text-gold-light" style={{ fontSize: 9 }}>✓</span>
                          </div>
                          <p className="font-cinzel text-cream/40" style={{ fontSize: 8, letterSpacing: "0.15em" }}>
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="text-cream/35 font-cinzel mt-1" style={{ fontSize: "clamp(8px, 1.2vw, 10px)", letterSpacing: "0.3em" }}>
                      {claimedDate.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 font-cinzel text-sm tracking-[0.2em] uppercase font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #FFD682, #C9A84C)",
                      color: "#1A0E06",
                      boxShadow: "0 6px 24px rgba(255,214,130,0.25)",
                    }}
                  >
                    <Download className="h-4 w-4" />
                    {downloading ? "Menyiapkan..." : "Download PDF"}
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-cream/20 py-3.5 font-cinzel text-sm tracking-[0.2em] uppercase text-cream/70 transition-all hover:border-cream/40 hover:text-cream"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}