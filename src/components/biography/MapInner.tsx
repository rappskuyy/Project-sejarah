// components/biography/MapInner.tsx
'use client'
import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker,
         Polyline, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { WarLocation } from '@/lib/data/warLocations'

// ── Tile layer bertema vintage/antik ──────────────────────────────────────
// Opsi 1 (gratis, vintage feel):
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// Opsi 2 (lebih antik, pakai Stadia):
// const TILE_URL = 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'

interface MapInnerProps {
  locations: WarLocation[]
  activeId: string
  route: [number, number][]
  onMarkerClick: (id: string) => void
}

// Auto-pan ke marker aktif
function PanToActive({ locations, activeId }: { locations: WarLocation[], activeId: string }) {
  const map = useMap()
  useEffect(() => {
    const loc = locations.find(l => l.id === activeId)
    if (loc) map.panTo([loc.lat, loc.lng], { animate: true, duration: 0.8 })
  }, [activeId, locations, map])
  return null
}

export default function MapInner({
  locations, activeId, route, onMarkerClick
}: MapInnerProps) {
  return (
    <MapContainer
      center={[5.0, 96.5]}
      zoom={7}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
      attributionControl={false}
      className="leaflet-container-custom"
    >
      <TileLayer
        url={TILE_URL}
        attribution='© OpenStreetMap contributors'
      />

      {/* Rute perjalanan — garis putus-putus emas */}
      <Polyline
        positions={route}
        pathOptions={{
          color: '#C8922A',
          weight: 2,
          dashArray: '8 6',
          opacity: 0.7
        }}
      />

      {/* Marker tiap lokasi */}
      {locations.map(loc => (
        <CircleMarker
          key={loc.id}
          center={[loc.lat, loc.lng]}
          radius={activeId === loc.id ? 14 : 10}
          pathOptions={{
            fillColor: loc.color,
            fillOpacity: 0.9,
            color: activeId === loc.id ? '#fff' : loc.color,
            weight: activeId === loc.id ? 3 : 1.5,
          }}
          eventHandlers={{ click: () => onMarkerClick(loc.id) }}
        >
          <Popup>
            <strong style={{ fontFamily: 'Playfair Display, serif' }}>
              {loc.name}
            </strong>
            <br/>
            <span style={{ fontSize: '12px', color: '#6B4423' }}>
              {loc.subtitle}
            </span>
          </Popup>
        </CircleMarker>
      ))}

      <PanToActive locations={locations} activeId={activeId} />
    </MapContainer>
  )
}