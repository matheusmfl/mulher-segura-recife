"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { divIcon } from "leaflet"
import "leaflet/dist/leaflet.css"

// Dados simulados de locais em Recife com coordenadas precisas
const locations = [
  { id: 1, lat: -8.0631, lng: -34.8711, name: "Marco Zero", rating: 4.3 },
  { id: 2, lat: -8.1206, lng: -34.9017, name: "Parque Dona Lindu", rating: 4.8 },
  { id: 3, lat: -8.1193, lng: -34.9044, name: "Shopping Recife", rating: 4.5 },
  { id: 4, lat: -8.0753, lng: -34.9093, name: "Terminal Integrado Joana Bezerra", rating: 2.7 },
  { id: 5, lat: -8.0584, lng: -34.8848, name: "Rua da Aurora", rating: 3.1 },
  { id: 6, lat: -8.0536, lng: -34.8979, name: "Praça do Derby", rating: 3.9 },
]

// Função para determinar a cor do marcador com base na avaliação
const getPinColor = (rating: number) => {
  if (rating >= 4) return "#22c55e" // verde
  if (rating >= 3) return "#eab308" // amarelo
  return "#ef4444" // vermelho
}

// Criar um ícone div personalizado
const createMarkerIcon = (rating: number) => {
  return divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${getPinColor(rating)}; width: 24px; height: 24px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; border: 2px solid white;">${rating.toFixed(1)}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  })
}

export default function MapWithNoSSR() {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[-8.0631, -34.8711]} // Centro em Marco Zero, Recife
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
            icon={createMarkerIcon(location.rating)}
          >
            <Popup>
              <div className="p-2">
                <div className="font-medium">{location.name}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: getPinColor(location.rating) }}
                  />
                  <span>{location.rating.toFixed(1)}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}