"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, MapPin, Send } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function RateLocationPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const categories = [
    { id: "lighting", label: "Iluminação adequada" },
    { id: "policing", label: "Policiamento" },
    { id: "harassment", label: "Livre de assédio" },
    { id: "crowd", label: "Movimento de pessoas" },
    { id: "transport", label: "Acesso a transporte" },
    { id: "visibility", label: "Boa visibilidade" },
  ]

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleSubmit = () => {
    // Aqui seria implementada a lógica para enviar a avaliação
    console.log({ rating, selectedCategories, comment })
    router.push("/dashboard/thank-you")
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-800">Avaliar Local</h1>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-medium text-gray-800">Localização atual</h2>
            <p className="text-gray-600">Av. Boa Viagem, 1000 - Recife</p>
          </div>

          <div className="mb-6">
            <h2 className="mb-4 text-lg font-medium text-gray-800">Como você se sente neste local?</h2>
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 ${(hoveredRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              {rating === 1 && "Muito inseguro"}
              {rating === 2 && "Inseguro"}
              {rating === 3 && "Neutro"}
              {rating === 4 && "Seguro"}
              {rating === 5 && "Muito seguro"}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-3 text-lg font-medium text-gray-800">Categorias</h2>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label htmlFor={category.id}>{category.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-medium text-gray-800">Comentário (opcional)</h2>
            <Textarea
              placeholder="Compartilhe sua experiência neste local..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700" disabled={rating === 0}>
            <Send className="mr-2 h-4 w-4" />
            Enviar avaliação
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
