'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colonialDocuments, type ColonialDocument } from '@/lib/data/colonialDocuments'

// ── SUB: Sisi Depan Kartu ──────────────────────────────────────────────────
function CardFront({ doc }: { doc: ColonialDocument }) {
  return (
    <div className="w-full h-full bg-[#F5EDD8] border border-[#D4B896]
      rounded-2xl overflow-hidden flex flex-col">

      {/* Header */}
      <div className="text-center py-5 px-6 border-b border-[#D4B896]">
        <p className="text-[10px] tracking-[.18em] uppercase
          text-[#8B6423] font-['Crimson_Pro'] mb-1">
          {doc.type}
        </p>
        <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#2C1810]">
          {doc.title}
        </h3>
        <p className="text-sm text-[#8B6423] mt-1 font-['Crimson_Pro']">
          {doc.date}
        </p>
      </div>

      {/* DARI / KEPADA */}
      <div className="grid grid-cols-2 border-b border-[#D4B896]">
        <div className="p-3 px-5 border-r border-[#D4B896]">
          <p className="text-[10px] tracking-[.12em] uppercase
            text-[#8B6423] mb-1 font-['Crimson_Pro']">DARI</p>
          <p className="text-sm font-semibold text-[#2C1810] font-['Crimson_Pro']">
            {doc.from}
          </p>
        </div>
        <div className="p-3 px-5">
          <p className="text-[10px] tracking-[.12em] uppercase
            text-[#8B6423] mb-1 font-['Crimson_Pro']">KEPADA</p>
          <p className="text-sm font-semibold text-[#2C1810] font-['Crimson_Pro']">
            {doc.to}
          </p>
        </div>
      </div>

      {/* Isi surat */}
      <div className="p-5 font-['Crimson_Pro'] italic text-sm
        leading-relaxed text-[#1C0E06] flex-1">
        {doc.content}
      </div>

      {/* Stempel + hint */}
      <div className="relative h-14">
        <p className="absolute bottom-4 left-5 text-[11px] text-[#8B6423]
          flex items-center gap-1 font-['Crimson_Pro']">
          ↻ Klik untuk balik
        </p>
        <div className="absolute bottom-3 right-4 w-[56px] h-[56px]
          rounded-full border-2 border-[#C8922A44] bg-[#FFF3E0]
          flex items-center justify-center text-[#C8922A] text-[9px]
          font-bold font-['Playfair_Display'] text-center leading-tight">
          Teuku<br/>Umar
        </div>
      </div>
    </div>
  )
}

// ── SUB: Sisi Belakang Kartu ───────────────────────────────────────────────
function CardBack({ doc }: { doc: ColonialDocument }) {
  return (
    <div className="w-full h-full bg-[#3A1F0D] border border-[#6B3A1F]
      rounded-2xl p-6 flex flex-col gap-4">

      <div className="w-11 h-11 bg-[#5A2C10] rounded-xl flex items-center
        justify-center text-[#C8922A] text-xl flex-shrink-0">
        ⟳
      </div>

      <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#F5EDD8]">
        Konteks Sejarah
      </h3>

      <p className="text-sm text-[#D4B896] leading-relaxed font-['Crimson_Pro']">
        {doc.context}
      </p>

      {/* Catatan sejarawan */}
      <div className="bg-[#4A2510] border-l-4 border-[#C8922A]
        rounded-r-xl p-3 px-4">
        <p className="text-[11px] tracking-[.1em] uppercase
          text-[#E8B84B] mb-1 font-['Crimson_Pro'] font-semibold">
          Catatan Sejarawan
        </p>
        <p className="text-[13px] text-[#C8A87A] leading-relaxed font-['Crimson_Pro']">
          {doc.historianNote}
        </p>
      </div>

      <p className="text-[11px] text-[#6B4A30] mt-auto font-['Crimson_Pro']
        flex items-center gap-1">
        ↻ Klik untuk kembali
      </p>
    </div>
  )
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export function ColonialDocuments() {
  const [activeId, setActiveId] = useState(colonialDocuments[0].id)
  const [flipped, setFlipped] = useState(false)

  // Reset flip saat ganti dokumen
  const handleSelect = (id: string) => {
    if (id !== activeId) {
      setFlipped(false)
      setActiveId(id)
    }
  }

  const activeDoc = colonialDocuments.find(d => d.id === activeId)!

  return (
    <section className="py-16 px-8 bg-[#FAF6EE]">

      {/* Header section */}
      <div className="text-center mb-10">
        <span className="inline-block bg-[#F0E8D6] border border-[#D4B896]
          rounded-full px-5 py-1.5 text-xs tracking-widest text-[#6B4423]
          uppercase font-semibold font-['Crimson_Pro']">
          Arsip Bersejarah
        </span>
        <h2 className="font-['Playfair_Display'] text-4xl font-bold
          text-[#2C1810] mt-3 mb-3">
          Dokumen Era Kolonial
        </h2>
        <p className="text-[#6B4423] text-base max-w-xl mx-auto
          leading-relaxed font-['Crimson_Pro']">
          Rekonstruksi surat dan dokumen bersejarah dari masa perjuangan Teuku Umar dan Cut Nyak Dien, termasuk bentuk penolakan, strategi intelijen, dan kisah pengasingan.
        </p>
      </div>

      {/* Grid 2 kolom */}
      <div className="grid grid-cols-[1fr_1.6fr] gap-6 max-w-4xl mx-auto">

        {/* Kiri: List dokumen */}
        <div className="flex flex-col gap-3">
          {colonialDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => handleSelect(doc.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2
                cursor-pointer transition-colors duration-200
                ${activeId === doc.id
                  ? 'border-[#C8922A] bg-[#FFF8EC]'
                  : 'border-[#D4B896] bg-white hover:border-[#C8922A55]'
                }`}
            >
              <div className="w-9 h-9 bg-[#F5EDD8] rounded-lg flex
                items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#C8922A" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div>
                <p className="font-['Playfair_Display'] text-sm font-bold text-[#2C1810]">
                  {doc.title}
                </p>
                <p className="text-xs text-[#8B6423] mt-0.5 font-['Crimson_Pro']">
                  {doc.date} · {doc.type}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kanan: Flip card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{ perspective: '1200px' }}
            className="relative min-h-[380px] cursor-pointer"
            onClick={() => setFlipped(f => !f)}
          >
            <motion.div
              style={{ transformStyle: 'preserve-3d', position: 'relative',
                width: '100%', minHeight: '380px' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* DEPAN */}
              <div style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0">
                <CardFront doc={activeDoc} />
              </div>

              {/* BELAKANG */}
              <div style={{ backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)' }}
                className="absolute inset-0">
                <CardBack doc={activeDoc} />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}