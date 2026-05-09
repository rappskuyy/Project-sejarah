// components/biography/MapInner.tsx
import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { WarLocation } from '@/lib/data/warLocations'

interface MapInnerProps {
  locations: WarLocation[]
  activeId: string
  route: [number, number][]
  onMarkerClick: (id: string) => void
}

function PanToActive({ locations, activeId }: { locations: WarLocation[], activeId: string }) {
  const map = useMap()
  const prevId = useRef<string>('')
  useEffect(() => {
    if (prevId.current === activeId) return
    const loc = locations.find(l => l.id === activeId)
    if (loc) {
      map.flyTo([loc.lat, loc.lng], 10, { animate: true, duration: 1.0 })
      prevId.current = activeId
    }
  }, [activeId, locations, map])
  return null
}

function createIcon(loc: WarLocation, isActive: boolean) {
  const typeIcon =
    loc.type === 'ibu-kota'     ? '🏰' :
    loc.type === 'tempat-lahir' ? '⭐' :
    loc.type === 'pertempuran'  ? '⚔' :
    loc.type === 'strategi'     ? '🎯' :
    loc.type === 'gugur'        ? '🕊' : '📍'

  return L.divIcon({
    className: '',
    iconAnchor: [20, 52],
    popupAnchor: [0, -54],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="
          background:${isActive ? loc.color : 'rgba(245,238,223,0.96)'};
          color:${isActive ? '#fff' : loc.color};
          border:1.5px solid ${isActive ? 'rgba(255,255,255,0.4)' : loc.color+'66'};
          border-radius:6px;padding:2px 7px;font-size:9.5px;
          font-family:'Cinzel',serif;font-weight:700;letter-spacing:0.05em;
          white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.18);margin-bottom:3px;
          max-width:120px;overflow:hidden;text-overflow:ellipsis;
        ">${loc.year} ${loc.name.split(',')[0]}</div>
        <svg width="40" height="52" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg"
          style="filter:drop-shadow(0 3px 5px rgba(0,0,0,0.3))">
          <path d="M20 2 C10.6 2 3 9.6 3 19 C3 31.5 20 50 20 50 C20 50 37 31.5 37 19 C37 9.6 29.4 2 20 2Z"
            fill="${isActive ? loc.color : '#8a4b37'}"
            stroke="white" stroke-width="${isActive ? 2.5 : 2}"/>
          <text x="20" y="23" text-anchor="middle" font-size="14" fill="white">${typeIcon}</text>
        </svg>
        ${isActive ? `<div style="
          position:absolute;bottom:0;left:50%;transform:translateX(-50%);
          width:40px;height:40px;border-radius:50%;
          border:2px solid ${loc.color}55;
          animation:pulse-map 1.8s ease-out infinite;
        "></div>` : ''}
      </div>
    `,
  })
}

function MarkersLayer({ locations, activeId, onMarkerClick }: {
  locations: WarLocation[], activeId: string, onMarkerClick: (id: string) => void
}) {
  const map = useMap()
  const markersRef = useRef<Record<string, L.Marker>>({})

  useEffect(() => {
    Object.values(markersRef.current).forEach(m => m.remove())
    markersRef.current = {}

    locations.forEach(loc => {
      const isActive = loc.id === activeId
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createIcon(loc, isActive),
        zIndexOffset: isActive ? 1000 : 0,
      })

      marker.bindPopup(`
        <div style="font-family:'Playfair Display',serif;min-width:180px;max-width:220px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="background:${loc.badgeColor};color:${loc.color};
              font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.2em;
              text-transform:uppercase;border-radius:20px;padding:2px 8px;
              font-weight:700;">${loc.badgeLabel}</span>
            <span style="font-size:10px;color:#999;">${loc.year}</span>
          </div>
          <p style="font-size:14px;font-weight:bold;color:#2C1810;margin:0 0 3px 0;">
            ${loc.name}
          </p>
          <p style="font-size:11px;color:${loc.color};margin:0 0 6px 0;font-weight:600;">
            ${loc.subtitle.split('·').slice(1).join('·').trim()}
          </p>
          <p style="font-size:11.5px;color:#5a3a18;line-height:1.55;margin:0;">
            ${loc.description.slice(0, 180)}${loc.description.length > 180 ? '…' : ''}
          </p>
        </div>
      `, { closeButton: false, maxWidth: 240 })

      marker.on('click', () => onMarkerClick(loc.id))
      marker.addTo(map)
      markersRef.current[loc.id] = marker
    })

    return () => {
      Object.values(markersRef.current).forEach(m => m.remove())
      markersRef.current = {}
    }
  }, [locations, activeId, map, onMarkerClick])

  return null
}

export default function MapInner({ locations, activeId, route, onMarkerClick }: MapInnerProps) {
  // Center: tengah Aceh
  const center: [number, number] = [4.8, 96.0]

  return (
    <>
      <style>{`
        @keyframes pulse-map {
          0%   { transform:translateX(-50%) scale(1); opacity:0.7; }
          100% { transform:translateX(-50%) scale(2.5); opacity:0; }
        }
        .leaflet-container { background:#c8dde8 !important; z-index:0 !important; }
        .leaflet-pane { z-index:auto !important; }
        .leaflet-top,.leaflet-bottom { z-index:1 !important; }
        .leaflet-tile { filter:sepia(20%) contrast(0.96) brightness(1.03) saturate(0.92); }
        .leaflet-popup-content-wrapper {
          background:rgba(255,248,236,0.97) !important;
          border:1.5px solid rgba(200,146,42,0.3) !important;
          border-radius:14px !important;
          box-shadow:0 8px 28px rgba(0,0,0,0.18) !important;
        }
        .leaflet-popup-tip { background:rgba(255,248,236,0.97) !important; }
        .leaflet-popup-content { margin:12px 16px !important; }
        .leaflet-control-zoom a {
          background:rgba(255,248,236,0.95) !important;
          color:#6B4423 !important;
          border-color:rgba(200,146,42,0.3) !important;
        }
      `}</style>
      <div style={{ isolation: 'isolate', position: 'relative', height: '100%', width: '100%' }}>
        <MapContainer
          center={center}
          zoom={7}
          style={{ width: '100%', height: '100%' }}
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={18} />

          {/* Rute gerilya */}
          <Polyline
            positions={route}
            pathOptions={{ color: '#C8922A', weight: 2.5, dashArray: '8 6', opacity: 0.65 }}
          />

          <PanToActive locations={locations} activeId={activeId} />
          <MarkersLayer locations={locations} activeId={activeId} onMarkerClick={onMarkerClick} />
        </MapContainer>
      </div>
    </>
  )
}