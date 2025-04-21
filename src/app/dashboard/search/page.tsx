"use client"

import { useState } from "react"
import { Search, MapPin, Star } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationType, setLocationType] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [minRating, setMinRating] = useState([3])

  const locations = [
    {
      id: 1,
      name: "Parque Dona Lindu",
      type: "Parque",
      rating: 4.8,
      neighborhood: "Boa Viagem",
      address: "Av. Boa Viagem, s/n - Boa Viagem",
    },
    {
      id: 2,
      name: "Shopping Recife",
      type: "Shopping",
      rating: 4.5,
      neighborhood: "Boa Viagem",
      address: "R. Padre Carapuceiro, 777 - Boa Viagem",
    },
    {
      id: 3,
      name: "Marco Zero",
      type: "Praça",
      rating: 4.3,
      neighborhood: "Recife Antigo",
      address: "Av. Alfredo Lisboa - Recife Antigo",
    },
    {
      id: 4,
      name: "Rua da Aurora",
      type: "Rua",
      rating: 3.1,
      neighborhood: "Santo Amaro",
      address: "Rua da Aurora - Santo Amaro",
    },
    {
      id: 5,
      name: "Terminal Integrado Joana Bezerra",
      type: "Terminal",
      rating: 2.7,
      neighborhood: "Joana Bezerra",
      address: "Av. Central - Joana Bezerra",
    },
  ]

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = locationType === "" || location.type === locationType
    const matchesNeighborhood = neighborhood === "" || location.neighborhood === neighborhood
    const matchesRating = location.rating >= minRating[0]

    return matchesSearch && matchesType && matchesNeighborhood && matchesRating
  })

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Buscar Locais</h1>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome ou endereço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de local</label>
              <Select value={locationType} onValueChange={setLocationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="Parque">Parque</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Praça">Praça</SelectItem>
                  <SelectItem value="Rua">Rua</SelectItem>
                  <SelectItem value="Terminal">Terminal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Bairro</label>
              <Select value={neighborhood} onValueChange={setNeighborhood}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os bairros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os bairros</SelectItem>
                  <SelectItem value="Boa Viagem">Boa Viagem</SelectItem>
                  <SelectItem value="Recife Antigo">Recife Antigo</SelectItem>
                  <SelectItem value="Santo Amaro">Santo Amaro</SelectItem>
                  <SelectItem value="Joana Bezerra">Joana Bezerra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Avaliação mínima: {minRating}</label>
              <Slider
                defaultValue={[3]}
                max={5}
                step={0.5}
                value={minRating}
                onValueChange={setMinRating}
                className="py-4"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredLocations.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
              <p className="text-gray-500">Nenhum local encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            filteredLocations.map((location) => (
              <div key={location.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{location.name}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <MapPin className="mr-1 h-4 w-4" />
                      {location.address}
                    </div>
                    <div className="mt-2 flex items-center">
                      <span
                        className={`mr-2 rounded-full px-2 py-1 text-xs font-medium ${location.rating >= 4
                          ? "bg-green-100 text-green-800"
                          : location.rating >= 3
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {location.type}
                      </span>
                      <span className="text-sm text-gray-500">{location.neighborhood}</span>
                    </div>
                  </div>
                  <div className="flex items-center rounded-full bg-purple-100 px-2 py-1 text-purple-800">
                    <Star className="mr-1 h-4 w-4 fill-purple-500 text-purple-500" />
                    <span className="font-medium">{location.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Ver detalhes
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
