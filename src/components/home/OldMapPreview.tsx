'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface HistoricalEvent {
  id: string
  year: string
  title: string
  location: string
  region: string
  text: string
  focus: [number, number]
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

function Recenter({ position }: { position: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true, duration: 0.8 })
  }, [position, map])

  return null
}

export default function OldMapPreview({ activeId, activeFocus, events, onMarkerClick }: OldMapPreviewProps) {
  return (
    <MapContainer
      center={toLatLng(activeFocus)}
      zoom={7}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
      className="leaflet-container-custom"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
        maxZoom={19}
      />

      {events.map((event) => (
        <CircleMarker
          key={event.id}
          center={toLatLng(event.focus)}
          radius={event.id === activeId ? 12 : 7}
          pathOptions={{
            fillColor: event.id === activeId ? '#b23c44' : '#8a4b37',
            fillOpacity: 0.85,
            color: '#fff',
            weight: event.id === activeId ? 2.5 : 1.5,
          }}
          eventHandlers={{ click: () => onMarkerClick(event.id) }}
        >
          <Popup>
            <strong style={{ fontFamily: 'Playfair Display, serif' }}>{event.title}</strong>
            <br />
            <span style={{ fontSize: '12px', color: '#6B4423' }}>{event.location}</span>
          </Popup>
        </CircleMarker>
      ))}

      <Recenter position={toLatLng(activeFocus)} />
    </MapContainer>
  )
}
