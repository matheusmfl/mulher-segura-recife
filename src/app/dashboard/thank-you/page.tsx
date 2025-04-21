"use client"

import { useRouter } from "next/navigation"
import { Heart, Share2, ArrowLeft } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  const router = useRouter()

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-100">
          <Heart className="h-12 w-12 text-purple-600" />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-800">Obrigada pela sua contribuição!</h1>

        <p className="mb-6 max-w-md text-gray-600">
          Sua experiência pode proteger outra mulher. Juntas estamos construindo uma cidade mais segura para todas nós.
        </p>

        <div className="mb-8 rounded-lg border border-purple-200 bg-purple-50 p-6 text-purple-800">
          <p className="text-lg font-medium">Você não está sozinha</p>
          <p className="mt-2">
            Compartilhar experiências é uma forma de cuidarmos umas das outras. Sua avaliação ajuda outras mulheres a se
            sentirem mais seguras.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => router.push("/dashboard")} className="gap-2 bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao mapa
          </Button>

          <Button variant="outline" className="gap-2 text-purple-600 hover:bg-purple-50">
            <Share2 className="h-4 w-4" />
            Compartilhar aplicativo
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
