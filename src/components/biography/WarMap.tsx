'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MapInner from './MapInner'
import {
  warLocations, legendItems, warRoute,
  type HeroFilter, type WarLocation
} from '@/lib/data/warLocations'

const filterTabs = [
  { id: 'all',           label: 'Semua Lokasi',  icon: '⊞', count: warLocations.length },
  { id: 'cut-nyak-dhien', label: 'Cut nyak dhien', icon: '✂', count: warLocations.filter(l => l.hero === 'cut-nyak-dhien').length },
  { id: 'teuku-umar',    label: 'Teuku Umar',    icon: '⚔', count: warLocations.filter(l => l.hero === 'teuku-umar').length },
] as const

// Timeline khusus Cut nyak dhien
const cndTimeline = warLocations
  .filter(l => l.hero === 'cut-nyak-dhien')
  .sort((a, b) => parseInt(a.year) - parseInt(b.year))

const tuTimeline = warLocations
  .filter(l => l.hero === 'teuku-umar')
  .sort((a, b) => parseInt(a.year) - parseInt(b.year))

export function WarMap() {
  const [filter, setFilter] = useState<HeroFilter>('all')
  const [activeId, setActiveId] = useState<string>('kutaraja-pusat')
  const [showDetail, setShowDetail] = useState(true)

  const filtered = warLocations.filter(
    loc => filter === 'all' || loc.hero === filter || loc.hero === 'all'
  )
  const activeLocation = warLocations.find(l => l.id === activeId)
  const timeline = filter === 'cut-nyak-dhien' ? cndTimeline : filter === 'teuku-umar' ? tuTimeline : []

  const handleMarkerClick = (id: string) => {
    setActiveId(id)
    setShowDetail(true)
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-[#F0E8D6]">

      {/* Header - Responsive */}
      <div className="text-center mb-4 md:mb-6">
        <span className="inline-block bg-[#FFF3CD] border border-[#D4B896]
          rounded-full px-3 md:px-5 py-1 md:py-1.5 text-[10px] md:text-xs tracking-widest text-[#8B6423]
          uppercase font-semibold font-['Crimson_Pro']">
          Peta Interaktif
        </span>
        <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl font-bold text-[#2C1810] mt-2 md:mt-3 mb-2 md:mb-3">
          Medan Perang Aceh
        </h2>
        <p className="text-[#6B4423] text-sm md:text-base max-w-xl mx-auto leading-relaxed font-['Crimson_Pro'] px-2">
          Jelajahi lokasi-lokasi bersejarah perjuangan pahlawan Aceh.
          Klik marker atau pilih tahun di timeline untuk melihat detail peristiwa.
        </p>
      </div>

      {/* Filter tabs - Responsive */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-4 md:mb-6">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setFilter(tab.id)
              // Set default active marker per filter
              if (tab.id === 'cut-nyak-dhien') setActiveId('cnd-lahir')
              else if (tab.id === 'teuku-umar') setActiveId('tu-lahir')
              else setActiveId('kutaraja-pusat')
            }}
            className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full border-2
              text-xs md:text-sm font-semibold font-['Crimson_Pro'] transition-all duration-200
              ${filter === tab.id
                ? 'bg-[#C8922A] border-[#C8922A] text-white shadow-md'
                : 'bg-white border-[#D4B896] text-[#6B4423] hover:border-[#C8922A]'
              }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              filter === tab.id ? 'bg-white/25 text-white' : 'bg-[#F0E8D6] text-[#8B6423]'
            }`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Grid utama - Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1.6fr] gap-4 md:gap-6 max-w-6xl mx-auto">

        {/* Peta - Responsive height */}
        <div className="relative rounded-2xl overflow-hidden border border-[#C8B89A] h-[300px] sm:h-[400px] md:h-[500px] bg-[#D4E8D8]"
          style={{ zIndex: 0, isolation: 'isolate' }}>
          <MapInner
            locations={filtered}
            activeId={activeId}
            route={warRoute}
            onMarkerClick={handleMarkerClick}
          />
          {/* Legenda - Responsive positioning */}
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-white/92 rounded-xl p-2 md:p-3 px-3 md:px-4 border border-[#D4B896] text-xs z-[999] backdrop-blur-sm max-w-[200px] md:max-w-none">
            <p className="font-['Playfair_Display'] font-bold text-[#2C1810] mb-1 md:mb-2 text-xs hidden md:block">Keterangan</p>
            <div className="flex flex-wrap gap-2 md:flex-col md:gap-1">
              {legendItems.map(item => (
                <div key={item.type} className="flex items-center gap-1 md:gap-2 my-0 md:my-1 font-['Crimson_Pro'] text-[#2C1810]">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-[2px] md:rounded-[3px] flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[10px] md:text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel kanan - Responsive */}
        <div className="flex flex-col gap-3 order-first xl:order-last">

          {/* Info konteks - Responsive */}
          <div className="bg-[#FFF3CD] rounded-2xl border border-[#D4B896] p-3 md:p-4 text-[#6B4423]">
            <p className="font-['Playfair_Display'] text-sm md:text-base font-bold mb-1">
              {filter === 'cut-nyak-dhien'
                ? '✂ Perjalanan Cut nyak dhien'
                : filter === 'teuku-umar'
                ? '⚔ Perjalanan Teuku Umar'
                : '⊞ Semua Lokasi Perang Aceh'}
            </p>
            <p className="text-xs md:text-sm leading-relaxed font-['Crimson_Pro']">
              {filter === 'cut-nyak-dhien'
                ? 'Ikuti perjalanan Cut nyak dhien dari kelahiran di Lampadang (1848) hingga wafat di Sumedang (1908) — 60 tahun penuh pengorbanan untuk Aceh.'
                : filter === 'teuku-umar'
                ? 'Telusuri jejak Teuku Umar dari Meulaboh (1854) hingga gugur sebagai pahlawan (1899) dengan strategi gerilya paling brillian.'
                : 'Peta ini menampilkan seluruh lokasi bersejarah Perang Aceh. Pilih filter untuk fokus pada perjalanan masing-masing pahlawan.'
              }
            </p>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] font-semibold mt-2">
              {filtered.length} lokasi ditampilkan
            </p>
          </div>

          {/* Detail card aktif - Responsive */}
          <AnimatePresence>
            {showDetail && activeLocation && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white rounded-2xl border-2 border-[#D4B896] p-3 md:p-4 relative"
              >
                <button
                  onClick={() => setShowDetail(false)}
                  className="absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-6 md:h-6 rounded-full
                    bg-[#F0E8D6] border border-[#D4B896] text-[#8B6423]
                    text-xs flex items-center justify-center hover:bg-[#E0D4BC]"
                >×</button>
                <span className="inline-block px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold
                  font-['Crimson_Pro'] mb-2"
                  style={{ background: activeLocation.badgeColor, color: activeLocation.color }}>
                  {activeLocation.badgeLabel} · {activeLocation.year}
                </span>
                <h3 className="font-['Playfair_Display'] text-sm md:text-lg font-bold text-[#2C1810] mb-1">
                  {activeLocation.name}
                </h3>
                <p className="text-xs md:text-sm font-bold mb-2 font-['Playfair_Display']"
                  style={{ color: activeLocation.color }}>
                  {activeLocation.subtitle.split('·').slice(1).join('·').trim()}
                </p>
                <p className="text-xs md:text-sm text-[#6B4423] leading-relaxed font-['Crimson_Pro']">
                  {activeLocation.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timeline (hanya saat filter hero) - Responsive */}
          {(filter === 'cut-nyak-dhien' || filter === 'teuku-umar') && (
            <div className="flex flex-col gap-1 max-h-[180px] md:max-h-[220px] overflow-y-auto pr-1">
              <p className="font-['Cinzel'] text-[10px] md:text-xs tracking-widest uppercase text-[#8B6423] mb-1">
                Timeline Perjalanan
              </p>
              {(filter === 'cut-nyak-dhien' ? cndTimeline : tuTimeline).map(loc => (
                <motion.button
                  key={loc.id}
                  whileHover={{ x: 2 }}
                  onClick={() => handleMarkerClick(loc.id)}
                  className={`flex items-center gap-2 md:gap-3 p-2 px-2.5 md:p-2.5 md:px-3 rounded-xl border-2
                    text-left transition-all duration-150 w-full
                    ${activeId === loc.id
                      ? 'bg-[#FFF8EC] border-[#C8922A]'
                      : 'bg-white border-[#D4B896] hover:border-[#C8922A55]'
                    }`}
                >
                  <div className="shrink-0 rounded-lg px-1.5 md:px-2.5 py-1 md:py-1.5 text-center font-['Cinzel']
                    text-[10px] md:text-xs tracking-wider font-bold"
                    style={{
                      background: activeId === loc.id ? loc.color : '#F0E8D6',
                      color: activeId === loc.id ? '#fff' : '#6B4423',
                      minWidth: '35px',
                    }}>
                    {loc.year}
                  </div>
                  <div className="min-w-0">
                    <p className="font-['Playfair_Display'] text-[11px] md:text-xs font-bold text-[#2C1810] truncate">
                      {loc.name.split(',')[0]}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-[#8B6423] font-['Crimson_Pro'] truncate">
                      {loc.badgeLabel} · {loc.subtitle.split('·').slice(1).join('·').trim()}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* List semua (saat filter all) - Responsive */}
          {filter === 'all' && (
            <div className="flex flex-col gap-1.5 md:gap-2 max-h-[200px] md:max-h-[260px] overflow-y-auto pr-1">
              {filtered.map(loc => (
                <motion.div
                  key={loc.id}
                  whileHover={{ x: 2 }}
                  onClick={() => handleMarkerClick(loc.id)}
                  className={`flex items-center gap-2 md:gap-3 p-2.5 md:p-3 px-3 md:px-4 rounded-xl border-2
                    cursor-pointer transition-all duration-150
                    ${activeId === loc.id
                      ? 'bg-[#FFF8EC] border-[#C8922A]'
                      : 'bg-white border-[#D4B896] hover:border-[#C8922A55]'
                    }`}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center
                    flex-shrink-0 text-white text-[10px] md:text-xs font-bold"
                    style={{ background: loc.color }}>
                    {loc.type === 'ibu-kota'     ? '🏰' :
                     loc.type === 'tempat-lahir' ? '⭐' :
                     loc.type === 'pertempuran'  ? '⚔' :
                     loc.type === 'strategi'     ? '🎯' :
                     loc.type === 'gugur'        ? '🕊' :
                     loc.type === 'pernikahan'   ? '💍' : '📍'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-['Playfair_Display'] text-xs md:text-sm font-bold text-[#2C1810] truncate">
                      {loc.name}
                    </p>
                    <p className="text-[10px] md:text-xs text-[#8B6423] font-['Crimson_Pro'] truncate">
                      {loc.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Route info - Responsive */}
      <div className="flex items-start gap-3 md:gap-4 bg-[#FFF8EC] border-2 border-[#DBC08A]
        rounded-2xl p-3 md:p-4 px-4 md:px-5 max-w-5xl mx-auto mt-4">
        <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#C8922A] flex items-center justify-center
          text-white text-xs md:text-sm font-bold flex-shrink-0 font-['Playfair_Display']">AT</div>
        <div>
          <p className="font-['Playfair_Display'] text-sm md:text-base font-bold text-[#2C1810]">
            Jalur Perang Aceh · 1873–1908
          </p>
          <p className="text-[10px] md:text-xs text-[#8B6423] font-['Crimson_Pro'] leading-relaxed mt-1">
            Garis putus-putus emas menunjukkan jalur pergerakan pasukan pejuang Aceh
            dari Kutaraja hingga pedalaman Aceh Tengah dan Meulaboh. Gunakan filter
            <strong> Cut nyak dhien</strong> untuk melihat 12 titik perjalanan lengkapnya,
            atau <strong>Teuku Umar</strong> untuk 7 titik strategi gerilyanya.
          </p>
        </div>
      </div>
    </section>
  )
}