"use client"

import { useState } from "react"
import { MapContainer } from "@/components/map-container"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  return (
    <DashboardLayout>
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Mapa de Segurança</h1>
          <div className="flex gap-2">
            <button
              className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200"
              onClick={() => setSelectedLocation(null)}
            >
              Buscar lugar seguro
            </button>
            <button
              className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              onClick={() => (window.location.href = "/dashboard/rate")}
            >
              Avaliar local
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <MapContainer />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-green-100 p-2 text-green-800">
            <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span> Seguro
          </div>
          <div className="rounded-lg bg-yellow-100 p-2 text-yellow-800">
            <span className="inline-block h-3 w-3 rounded-full bg-yellow-500"></span> Atenção
          </div>
          <div className="rounded-lg bg-red-100 p-2 text-red-800">
            <span className="inline-block h-3 w-3 rounded-full bg-red-500"></span> Alerta
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
