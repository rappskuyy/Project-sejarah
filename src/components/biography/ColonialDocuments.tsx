'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { colonialDocuments, type ColonialDocument } from '@/lib/data/colonialDocuments'

// ── Filter tabs ────────────────────────────────────────────────────────────
const filterTabs = [
  { id: 'semua',        label: 'Semua Dokumen', icon: '📜' },
  { id: 'teuku-umar',   label: 'Teuku Umar',    icon: '⚔' },
  { id: 'cut-nyak-dhien',label: 'Cut nyak dhien', icon: '✂' },
  { id: 'keduanya',     label: 'Bersama',        icon: '🤝' },
] as const

// ── SUB: Sisi Depan Kartu ──────────────────────────────────────────────────
function CardFront({ doc }: { doc: ColonialDocument }) {
  const isHero = (id: string) => doc.hero === id
  const accentColor = isHero('cut-nyak-dien') ? '#C8922A' : isHero('teuku-umar') ? '#8B1A1A' : '#4A7C3F'
  const stampLabel = isHero('cut-nyak-dien') ? 'Cut\nNyak\nDien' : isHero('teuku-umar') ? 'Teuku\nUmar' : 'Aceh\nBersatu'

  return (
    <div className="w-full h-full bg-[#F5EDD8] border border-[#D4B896] rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="text-center py-5 px-6 border-b border-[#D4B896]">
        <p className="text-[10px] tracking-[.18em] uppercase text-[#8B6423] font-['Crimson_Pro'] mb-1">
          {doc.type}
        </p>
        <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#2C1810]">
          {doc.title}
        </h3>
        <p className="text-sm text-[#8B6423] mt-1 font-['Crimson_Pro']">{doc.date}</p>
      </div>

      {/* DARI / KEPADA */}
      <div className="grid grid-cols-2 border-b border-[#D4B896]">
        <div className="p-3 px-5 border-r border-[#D4B896]">
          <p className="text-[10px] tracking-[.12em] uppercase text-[#8B6423] mb-1 font-['Crimson_Pro']">DARI</p>
          <p className="text-sm font-semibold text-[#2C1810] font-['Crimson_Pro']">{doc.from}</p>
        </div>
        <div className="p-3 px-5">
          <p className="text-[10px] tracking-[.12em] uppercase text-[#8B6423] mb-1 font-['Crimson_Pro']">KEPADA</p>
          <p className="text-sm font-semibold text-[#2C1810] font-['Crimson_Pro']">{doc.to}</p>
        </div>
      </div>

      {/* Isi surat */}
      <div className="p-5 font-['Crimson_Pro'] italic text-sm leading-relaxed text-[#1C0E06] flex-1 overflow-y-auto">
        {doc.content.split('\n').map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </div>

      {/* Stempel + hint */}
      <div className="relative h-14 border-t border-[#D4B896]/50 flex items-center justify-between px-5">
        <p className="text-[11px] text-[#8B6423] flex items-center gap-1 font-['Crimson_Pro']">
          ↻ Klik untuk konteks sejarah
        </p>
        <div className="w-[52px] h-[52px] rounded-full border-2 flex items-center justify-center
          text-[8px] font-bold font-['Playfair_Display'] text-center leading-tight -mt-2"
          style={{ borderColor: accentColor + '55', background: accentColor + '18', color: accentColor }}>
          {stampLabel.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
        </div>
      </div>
    </div>
  )
}

// ── SUB: Sisi Belakang Kartu ───────────────────────────────────────────────
function CardBack({ doc }: { doc: ColonialDocument }) {
  return (
    <div className="w-full h-full bg-[#3A1F0D] border border-[#6B3A1F] rounded-2xl p-6 flex flex-col gap-4">
      <div className="w-11 h-11 bg-[#5A2C10] rounded-xl flex items-center justify-center text-[#C8922A] text-xl flex-shrink-0">⟳</div>
      <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#F5EDD8]">Konteks Sejarah</h3>
      <p className="text-sm text-[#D4B896] leading-relaxed font-['Crimson_Pro'] flex-1 overflow-y-auto">{doc.context}</p>
      <div className="bg-[#4A2510] border-l-4 border-[#C8922A] rounded-r-xl p-3 px-4">
        <p className="text-[11px] tracking-[.1em] uppercase text-[#E8B84B] mb-1 font-['Crimson_Pro'] font-semibold">Catatan Sejarawan</p>
        <p className="text-[13px] text-[#C8A87A] leading-relaxed font-['Crimson_Pro']">{doc.historianNote}</p>
      </div>
      <p className="text-[11px] text-[#6B4A30] font-['Crimson_Pro'] flex items-center gap-1">↻ Klik untuk kembali</p>
    </div>
  )
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export function ColonialDocuments() {
  const [filter, setFilter] = useState<'semua' | 'teuku-umar' | 'cut-nyak-dien' | 'keduanya'>('semua')
  const [activeId, setActiveId] = useState(colonialDocuments[0].id)
  const [flipped, setFlipped] = useState(false)

  const filtered = colonialDocuments.filter(
    d => filter === 'semua' || d.hero === filter
  )

  const activeDoc = colonialDocuments.find(d => d.id === activeId)
    ?? filtered[0]
    ?? colonialDocuments[0]

  const handleSelect = (id: string) => {
    if (id !== activeId) { setFlipped(false); setActiveId(id) }
  }

  const handleFilter = (f: typeof filter) => {
    setFilter(f)
    setFlipped(false)
    const first = colonialDocuments.find(d => f === 'semua' || d.hero === f)
    if (first) setActiveId(first.id)
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-[#FAF6EE]">

      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block bg-[#F0E8D6] border border-[#D4B896] rounded-full
          px-5 py-1.5 text-xs tracking-widest text-[#6B4423] uppercase font-semibold font-['Crimson_Pro']">
          Arsip Bersejarah
        </span>
        <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#2C1810] mt-3 mb-3">
          Dokumen Era Kolonial
        </h2>
        <p className="text-[#6B4423] text-base max-w-xl mx-auto leading-relaxed font-['Crimson_Pro']">
          Rekonstruksi surat dan dokumen dari masa perjuangan Teuku Umar dan Cut nyak dhien.
          Pilih filter untuk melihat dokumen masing-masing pahlawan.
        </p>
      </div>

      {/* ⚠️ DISCLAIMER */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-2xl px-5 py-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800 font-['Playfair_Display'] mb-1">
              Catatan Penting: Dokumen Rekonstruksi Imajinatif
            </p>
            <p className="text-xs text-amber-700 font-['Crimson_Pro'] leading-relaxed">
              Seluruh dokumen yang ditampilkan di sini adalah <strong>rekonstruksi fiksi imajinatif</strong> yang dibuat 
              berdasarkan fakta dan peristiwa sejarah yang telah terdokumentasi. Dokumen asli tidak tersedia 
              secara publik. Konten ini disajikan semata-mata untuk tujuan <strong>edukasi dan penghayatan sejarah</strong>, 
              bukan sebagai arsip atau sumber historis primer.
            </p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto mb-6">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2
              text-sm font-semibold font-['Crimson_Pro'] transition-all duration-200
              ${filter === tab.id
                ? 'bg-[#C8922A] border-[#C8922A] text-white shadow-md'
                : 'bg-white border-[#D4B896] text-[#6B4423] hover:border-[#C8922A]'
              }`}
          >
            <span>{tab.icon}</span> {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              filter === tab.id ? 'bg-white/25 text-white' : 'bg-[#F0E8D6] text-[#8B6423]'
            }`}>
              {tab.id === 'semua'
                ? colonialDocuments.length
                : colonialDocuments.filter(d => d.hero === tab.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-6 max-w-4xl mx-auto">

        {/* Kiri: List dokumen */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((doc) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                whileHover={{ x: 4 }}
                onClick={() => handleSelect(doc.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors duration-200
                  ${activeId === doc.id
                    ? 'border-[#C8922A] bg-[#FFF8EC]'
                    : 'border-[#D4B896] bg-white hover:border-[#C8922A55]'
                  }`}
              >
                {/* Hero badge */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs`}
                  style={{ background: doc.hero === 'cut-nyak-dien' ? '#C8922A' : doc.hero === 'teuku-umar' ? '#8B1A1A' : '#4A7C3F' }}>
                  {doc.hero === 'cut-nyak-dien' ? '✂' : doc.hero === 'teuku-umar' ? '⚔' : '🤝'}
                </div>
                <div className="min-w-0">
                  <p className="font-['Playfair_Display'] text-sm font-bold text-[#2C1810] truncate">
                    {doc.title}
                  </p>
                  <p className="text-xs text-[#8B6423] mt-0.5 font-['Crimson_Pro'] truncate">
                    {doc.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-[#8B6423] font-['Crimson_Pro']">
              <p className="text-3xl mb-2">📜</p>
              <p className="text-sm">Tidak ada dokumen untuk filter ini.</p>
            </div>
          )}
        </div>

        {/* Kanan: Flip card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDoc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{ perspective: '1200px' }}
            className="relative min-h-[420px] cursor-pointer"
            onClick={() => setFlipped(f => !f)}
          >
            <motion.div
              style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', minHeight: '420px' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0">
                <CardFront doc={activeDoc} />
              </div>
              <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0">
                <CardBack doc={activeDoc} />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}