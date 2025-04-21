"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"

export function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Dados simulados de locais em Recife
  const locations = [
    { id: 1, lat: -8.0476, lng: -34.877, name: "Marco Zero", rating: 4.3 },
    { id: 2, lat: -8.0522, lng: -34.8719, name: "Parque Dona Lindu", rating: 4.8 },
    { id: 3, lat: -8.0631, lng: -34.8813, name: "Shopping Recife", rating: 4.5 },
    { id: 4, lat: -8.0505, lng: -34.9506, name: "Terminal Integrado Joana Bezerra", rating: 2.7 },
    { id: 5, lat: -8.0428, lng: -34.8801, name: "Rua da Aurora", rating: 3.1 },
    { id: 6, lat: -8.0594, lng: -34.8811, name: "Praça do Derby", rating: 3.9 },
  ]

  useEffect(() => {
    // Simulação de carregamento do mapa
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Função para determinar a cor do marcador com base na avaliação
  const getPinColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500"
    if (rating >= 3) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div ref={mapRef} className="relative h-full w-full bg-gray-100">
      {!isMapLoaded ? (
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
        </div>
      ) : (
        <>
          {/* Mapa simulado */}
          <div className="h-full w-full bg-[#f2f2f2] bg-opacity-80">
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Mapa"
              className="h-full w-full object-cover opacity-50"
            />
          </div>

          {/* Marcadores no mapa */}
          {locations.map((location) => (
            <div
              key={location.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{
                left: `${((location.lng + 34.95) / 0.1) * 100}%`,
                top: `${((location.lat + 8.07) / 0.1) * 100}%`,
              }}
            >
              <div className="group relative cursor-pointer">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${getPinColor(location.rating)} text-white shadow-md transition-all hover:z-10 hover:scale-125`}
                >
                  <MapPin className="h-4 w-4 fill-current" />
                </div>

                <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 scale-0 rounded-lg bg-white p-2 text-sm shadow-lg transition-all group-hover:scale-100">
                  <div className="whitespace-nowrap font-medium">{location.name}</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className={`inline-block h-2 w-2 rounded-full ${getPinColor(location.rating)}`}></span>
                    <span>{location.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
