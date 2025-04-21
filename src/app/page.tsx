"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import logo from '../../public/images/leaflet/LogoMulher.svg'

export default function WelcomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
      setLoading(false)
    }, 1000)
  }

  const handleAnonymous = () => {
    setLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 p-4">
      <Card className="w-full max-w-md overflow-hidden rounded-lg border-0 shadow-lg">
        <div className="bg-purple-600 p-6 text-center text-white">
          <Image src={logo} alt="logomarca" className="mx-auto mb-2 h-16 w-16" />
          <h1 className="text-3xl font-bold">Lugar de mulher</h1>
        </div>
        <CardContent className="p-6">
          <div className="mb-8 text-center">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Juntas por uma cidade mais segura</h2>
            <p className="text-gray-600">
              Compartilhe experiências e encontre locais seguros para mulheres em recife
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
              onClick={handleLogin}
              disabled={loading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Fazer login
            </Button>
            <Button
              variant="outline"
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
              size="lg"
              onClick={handleAnonymous}
              disabled={loading}
            >
              Entrar como anônima
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
