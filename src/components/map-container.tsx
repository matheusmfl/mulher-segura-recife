"use client"

import dynamic from "next/dynamic"

// Componente de carregamento enquanto o mapa é carregado
const LoadingMap = () => (
  <div className="flex h-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
  </div>
)

// Importação dinâmica do componente de mapa com SSR desativado
const MapWithNoSSR = dynamic(
  () => import("@/components/map-with-no-ssr"),
  {
    ssr: false,
    loading: () => <LoadingMap />
  }
)

export function MapContainer() {
  return <MapWithNoSSR />
}