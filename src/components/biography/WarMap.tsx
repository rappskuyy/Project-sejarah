'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MapInner from './MapInner'
import {
  warLocations, legendItems, warRoute,
  type HeroFilter, type WarLocation
} from '@/lib/data/warLocations'

// ── Filter tabs ────────────────────────────────────────────────────────────
const filterTabs = [
  { id: 'all',           label: 'Semua Lokasi',  icon: '⊞' },
  { id: 'cut-nyak-dien', label: 'Cut Nyak Dien', icon: '✂' },
  { id: 'teuku-umar',    label: 'Teuku Umar',    icon: '⚔' },
] as const

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export function WarMap() {
  const [filter, setFilter]       = useState<HeroFilter>('all')
  const [activeId, setActiveId]   = useState<string>('aceh-besar')
  const [showDetail, setShowDetail] = useState(true)

  const filtered = warLocations.filter(
    loc => filter === 'all' || loc.hero === filter || loc.hero === 'all'
  )
  const activeLocation = warLocations.find(l => l.id === activeId)

  const handleMarkerClick = (id: string) => {
    setActiveId(id)
    setShowDetail(true)
  }

  return (
    <section className="py-16 px-8 bg-[#F0E8D6]">

      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block bg-[#FFF3CD] border border-[#D4B896]
          rounded-full px-5 py-1.5 text-xs tracking-widest text-[#8B6423]
          uppercase font-semibold font-['Crimson_Pro']">
          Peta Interaktif
        </span>
        <h2 className="font-['Playfair_Display'] text-4xl font-bold
          text-[#2C1810] mt-3 mb-3">
          Medan Perang Aceh
        </h2>
        <p className="text-[#6B4423] text-base max-w-xl mx-auto
          leading-relaxed font-['Crimson_Pro']">
          Jelajahi lokasi-lokasi bersejarah perjuangan pahlawan Aceh.
          Klik marker untuk melihat detail peristiwa.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 justify-center mb-6">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full
              border-2 text-sm font-semibold font-['Crimson_Pro']
              transition-all duration-200
              ${filter === tab.id
                ? 'bg-[#C8922A] border-[#C8922A] text-white'
                : 'bg-white border-[#D4B896] text-[#6B4423] hover:border-[#C8922A]'
              }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid: Peta kiri + Panel kanan */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-5 max-w-5xl mx-auto">

        {/* Peta Leaflet */}
        <div className="relative rounded-2xl overflow-hidden border
          border-[#C8B89A] min-h-[360px] bg-[#D4E8D8]">
          <MapInner
            locations={filtered}
            activeId={activeId}
            route={warRoute}
            onMarkerClick={handleMarkerClick}
          />

          {/* Legenda */}
          <div className="absolute bottom-3 left-3 bg-white/90
            rounded-xl p-3 px-4 border border-[#D4B896] text-xs z-[999]">
            {legendItems.map(item => (
              <div key={item.type}
                className="flex items-center gap-2 my-1 font-['Crimson_Pro']
                  text-[#2C1810]">
                <div className="w-3 h-3 rounded-[3px] flex-shrink-0"
                  style={{ background: item.color }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Panel kanan */}
        <div className="flex flex-col gap-3">

          {/* Materi peta dan konteks Cut Nyak Dien */}
          <div className="bg-[#FFF3CD] rounded-2xl border border-[#D4B896] p-4 text-[#6B4423]">
            <p className="font-['Playfair_Display'] text-base font-bold mb-2">
              {filter === 'cut-nyak-dien' ? 'Materi Cut Nyak Dien' : 'Materi Peta Aceh'}
            </p>
            <p className="text-sm leading-relaxed font-['Crimson_Pro'] mb-3">
              {filter === 'cut-nyak-dien'
                ? 'Telusuri perjalanan Cut Nyak Dien: kelahiran Lampadang, pertempuran Gle Tarum, hingga pengasingan Sumedang.'
                : 'Pilih filter untuk menampilkan lokasi penting dan konteks perjuangan Teuku Umar atau Cut Nyak Dien di medan perang Aceh.'
              }
            </p>
            <p className="text-xs uppercase tracking-[0.18em] font-semibold">
              {filter === 'cut-nyak-dien' ? 'Peta fokus: kisah wanita pejuang' : 'Peta fokus: medan perang Aceh'}
            </p>
          </div>

          {/* Detail card (muncul saat klik marker) */}
          <AnimatePresence>
            {showDetail && activeLocation && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white rounded-2xl border-2 border-[#D4B896]
                  p-4 relative"
              >
                <button
                  onClick={() => setShowDetail(false)}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full
                    bg-[#F0E8D6] border border-[#D4B896] text-[#8B6423]
                    text-xs flex items-center justify-center hover:bg-[#E0D4BC]"
                >
                  ×
                </button>

                <span className="inline-block px-3 py-1 rounded-full text-xs
                  font-bold font-['Crimson_Pro'] mb-2"
                  style={{
                    background: activeLocation.badgeColor,
                    color: activeLocation.color
                  }}>
                  {activeLocation.badgeLabel}
                </span>

                <h3 className="font-['Playfair_Display'] text-lg font-bold
                  text-[#2C1810] mb-1">
                  {activeLocation.name}
                </h3>
                <p className="text-sm font-bold mb-2 font-['Playfair_Display']"
                  style={{ color: activeLocation.color }}>
                  {activeLocation.subtitle.split('·').slice(1).join('·').trim()}
                </p>
                <p className="text-sm text-[#6B4423] leading-relaxed font-['Crimson_Pro']">
                  {activeLocation.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List semua lokasi (scrollable) */}
          <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto
            pr-1 scrollbar-thin">
            {filtered.map(loc => (
              <motion.div
                key={loc.id}
                whileHover={{ x: 3 }}
                onClick={() => handleMarkerClick(loc.id)}
                className={`flex items-center gap-3 p-3 px-4 rounded-xl
                  border-2 cursor-pointer transition-all duration-150
                  ${activeId === loc.id
                    ? 'bg-[#FFF8EC] border-[#C8922A]'
                    : 'bg-white border-[#D4B896] hover:border-[#C8922A55]'
                  }`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center
                  justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ background: loc.color }}>
                  {loc.type === 'ibu-kota'     ? '⊞' :
                   loc.type === 'tempat-lahir' ? '◎' :
                   loc.type === 'pertempuran'  ? '✕' :
                   loc.type === 'strategi'     ? '◆' : '◉'}
                </div>
                <div>
                  <p className="font-['Playfair_Display'] text-sm font-bold
                    text-[#2C1810]">
                    {loc.name}
                  </p>
                  <p className="text-xs text-[#8B6423] font-['Crimson_Pro']">
                    {loc.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Route bar bawah */}
      <div className="flex items-start gap-4 bg-[#FFF8EC] border-2
        border-[#DBC08A] rounded-2xl p-4 px-5 max-w-5xl mx-auto mt-4">
        <div className="w-9 h-9 rounded-full bg-[#C8922A] flex items-center
          justify-center text-white text-xs font-bold flex-shrink-0
          font-['Playfair_Display']">
          AT
        </div>
        <div>
          <p className="font-['Playfair_Display'] text-sm font-bold text-[#2C1810]">
            Jalur Perang Aceh
          </p>
          <p className="text-xs text-[#8B6423] font-['Crimson_Pro'] mb-1">
            1873 – 1899
          </p>
          <p className="text-xs text-[#8B6423] font-['Crimson_Pro'] leading-relaxed">
            Garis putus-putus di peta menunjukkan jalur pergerakan pasukan pejuang
            Aceh dari Banda Aceh hingga Meulaboh selama Perang Aceh berlangsung.
          </p>
        </div>
      </div>

    </section>
  )
}