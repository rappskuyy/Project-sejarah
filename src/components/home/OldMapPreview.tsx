import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix leaflet default icon bug di Vite/webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface HistoricalEvent {
  id: string
  year: string
  title: string
  location: string
  region: string
  text: string
  focus: [number, number] // [lng, lat]
}

interface OldMapPreviewProps {
  activeId: string
  activeFocus: [number, number]
  events: HistoricalEvent[]
  onMarkerClick: (id: string) => void
}

function toLatLng([lng, lat]: [number, number]): [number, number] {
  return [lat, lng]
}

// Komponen untuk smooth fly-to saat marker aktif berubah
function FlyToActive({ activeFocus }: { activeFocus: [number, number] }) {
  const map = useMap()
  const prevFocus = useRef<[number, number] | null>(null)

  useEffect(() => {
    const [lng, lat] = activeFocus
    const prev = prevFocus.current

    // Hanya fly jika lokasi benar-benar berubah
    if (!prev || prev[0] !== lng || prev[1] !== lat) {
      map.flyTo([lat, lng], 9, { animate: true, duration: 1.2 })
      prevFocus.current = activeFocus
    }
  }, [activeFocus, map])

  return null
}

// Custom DivIcon untuk marker dengan label tahun
function createMarkerIcon(year: string, isActive: boolean) {
  return L.divIcon({
    className: '',
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
    html: `
      <div style="
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
      ">
        <!-- Label tahun -->
        <div style="
          background: ${isActive ? '#b23c44' : 'rgba(245,238,223,0.95)'};
          color: ${isActive ? '#fff' : '#6B4423'};
          border: 1px solid ${isActive ? 'rgba(255,255,255,0.4)' : 'rgba(138,75,55,0.4)'};
          border-radius: 5px;
          padding: 2px 7px;
          font-size: 10px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          letter-spacing: 0.05em;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          margin-bottom: 3px;
        ">${year}</div>

        <!-- Pin SVG -->
        <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg"
          style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35))">
          <path d="M16 2 C8.27 2 2 8.27 2 16 C2 26 16 40 16 40 C16 40 30 26 30 16 C30 8.27 23.73 2 16 2 Z"
            fill="${isActive ? '#b23c44' : '#8a4b37'}"
            stroke="white"
            stroke-width="${isActive ? 2.5 : 2}"
          />
          <circle cx="16" cy="16" r="6" fill="white" opacity="${isActive ? 1 : 0.75}" />
          ${isActive ? `
          <circle cx="16" cy="16" r="3" fill="#b23c44" />
          ` : ''}
        </svg>

        ${isActive ? `
        <!-- Pulse ring animasi -->
        <div style="
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid rgba(178,60,68,0.5);
          animation: pulse-ring 1.8s ease-out infinite;
        "></div>
        ` : ''}
      </div>
    `,
  })
}

export default function OldMapPreview({
  activeId,
  activeFocus,
  events,
  onMarkerClick,
}: OldMapPreviewProps) {
  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: translateX(-50%) scale(1); opacity: 0.7; }
          100% { transform: translateX(-50%) scale(2.8); opacity: 0; }
        }
        .leaflet-container {
          background: #c8dde8 !important;
          font-family: 'Playfair Display', serif;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(245,238,223,0.97) !important;
          border: 1px solid rgba(138,75,55,0.3) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2) !important;
          backdrop-filter: blur(8px);
        }
        .leaflet-popup-tip {
          background: rgba(245,238,223,0.97) !important;
        }
        .leaflet-popup-content {
          margin: 10px 14px !important;
        }
        .leaflet-tile {
          filter: sepia(25%) contrast(0.95) brightness(1.04) saturate(0.9);
        }
        .leaflet-control-zoom a {
          background: rgba(245,238,223,0.95) !important;
          color: #6B4423 !important;
          border-color: rgba(138,75,55,0.3) !important;
          font-family: 'Cinzel', serif !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(178,60,68,0.1) !important;
        }
      `}</style>

      <MapContainer
        center={toLatLng(activeFocus)}
        zoom={8}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
        attributionControl={false}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {/* Auto fly-to saat marker aktif berubah */}
        <FlyToActive activeFocus={activeFocus} />

        {/* Semua marker tampil sekaligus */}
        {events.map((event) => {
          const isActive = event.id === activeId
          const [eLng, eLat] = event.focus

          return (
            <CircleMarker
              key={event.id}
              center={[eLat, eLng]}
              radius={0}
              pathOptions={{ opacity: 0, fillOpacity: 0 }}
              eventHandlers={{ click: () => onMarkerClick(event.id) }}
            >
              {/* Gunakan marker custom via Marker + divIcon */}
            </CircleMarker>
          )
        })}

        {/* Marker custom pakai L.marker langsung via ref */}
        <MarkersLayer
          events={events}
          activeId={activeId}
          onMarkerClick={onMarkerClick}
        />

        {/* Attribution custom */}
        <div
          className="leaflet-bottom leaflet-left"
          style={{ pointerEvents: 'none' }}
        />
      </MapContainer>
    </>
  )
}

// Komponen terpisah untuk render marker custom
function MarkersLayer({
  events,
  activeId,
  onMarkerClick,
}: {
  events: HistoricalEvent[]
  activeId: string
  onMarkerClick: (id: string) => void
}) {
  const map = useMap()
  const markersRef = useRef<Record<string, L.Marker>>({})

  useEffect(() => {
    // Bersihkan marker lama
    Object.values(markersRef.current).forEach((m) => m.remove())
    markersRef.current = {}

    // Tambah semua marker
    events.forEach((event) => {
      const isActive = event.id === activeId
      const [eLng, eLat] = event.focus

      const marker = L.marker([eLat, eLng], {
        icon: createMarkerIcon(event.year, isActive),
        zIndexOffset: isActive ? 1000 : 0,
      })

      // Popup info
      marker.bindPopup(`
        <div style="font-family: 'Playfair Display', serif; min-width: 140px;">
          <p style="font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.3em;
            text-transform: uppercase; color: #b23c44; margin: 0 0 4px 0;">
            ${event.location}
          </p>
          <p style="font-size: 14px; font-weight: bold; color: #2D1A0A; margin: 0 0 4px 0;">
            ${event.title}
          </p>
          <p style="font-size: 11px; color: #6B4423; margin: 0;">
            ${event.year}
          </p>
        </div>
      `, {
        closeButton: false,
        maxWidth: 200,
      })

      marker.on('click', () => {
        onMarkerClick(event.id)
      })

      marker.addTo(map)
      markersRef.current[event.id] = marker
    })

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove())
      markersRef.current = {}
    }
  }, [events, activeId, map, onMarkerClick])

  return null
}