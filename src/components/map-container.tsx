"use client"

import { useEffect, useState } from "react"
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

export function MapContainer() {
  const [isClient, setIsClient] = useState(false)

  // Dados simulados de locais em Recife com coordenadas precisas
  const locations = [
    { id: 1, lat: -8.0631, lng: -34.8711, name: "Marco Zero", rating: 4.3 },
    { id: 2, lat: -8.1206, lng: -34.9017, name: "Parque Dona Lindu", rating: 4.8 },
    { id: 3, lat: -8.1193, lng: -34.9044, name: "Shopping Recife", rating: 4.5 },
    { id: 4, lat: -8.0753, lng: -34.9093, name: "Terminal Integrado Joana Bezerra", rating: 2.7 },
    { id: 5, lat: -8.0584, lng: -34.8848, name: "Rua da Aurora", rating: 3.1 },
    { id: 6, lat: -8.0536, lng: -34.8979, name: "Praça do Derby", rating: 3.9 },
  ]

  // Corrigir o problema dos ícones do Leaflet no Next.js
  useEffect(() => {
    // Isso é necessário porque o Leaflet tenta carregar os ícones de um caminho relativo
    delete (Icon.Default.prototype as any)._getIconUrl

    // Definir os caminhos corretos para os ícones
    Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
      iconUrl: '/images/leaflet/marker-icon.png',
      shadowUrl: '/images/leaflet/marker-shadow.png',
    })

    setIsClient(true)
  }, [])

  // Função para determinar a cor do marcador com base na avaliação
  const getPinColor = (rating: number) => {
    if (rating >= 4) return "green"
    if (rating >= 3) return "yellow"
    return "red"
  }

  // Criar ícones personalizados para os marcadores
  const createCustomIcon = (color: string) => {
    return new Icon({
      iconUrl: `/images/markers/${color}-marker.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    })
  }

  if (!isClient) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <LeafletMap
        center={[-8.0631, -34.8711]} // Centro em Marco Zero, Recife (coordenadas precisas)
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
          // Use o ícone padrão do Leaflet para garantir que funcione
          // Depois que os ícones padrão funcionarem, você pode tentar os personalizados
          // icon={createCustomIcon(getPinColor(location.rating))}
          >
            <Popup>
              <div className="p-1">
                <div className="font-medium">{location.name}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`inline-block h-2 w-2 rounded-full bg-${getPinColor(location.rating)}-500`}></span>
                  <span>{location.rating.toFixed(1)}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  )
}