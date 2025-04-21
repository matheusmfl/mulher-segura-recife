"use client"

import { useState } from "react"
import { User, Settings, MapPin, Star, Moon, Globe, LogOut, Shield } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [offlineMode, setOfflineMode] = useState(false)
  const [language, setLanguage] = useState("pt")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const ratedLocations = [
    { id: 1, name: "Parque Dona Lindu", date: "10/04/2023", rating: 5 },
    { id: 2, name: "Shopping Recife", date: "22/03/2023", rating: 4 },
    { id: 3, name: "Marco Zero", date: "15/03/2023", rating: 4 },
    { id: 4, name: "Terminal Integrado Joana Bezerra", date: "02/03/2023", rating: 2 },
  ]

  const savedLocations = [
    { id: 1, name: "Shopping RioMar", type: "Shopping", rating: 4.7 },
    { id: 2, name: "Parque da Jaqueira", type: "Parque", rating: 4.2 },
    { id: 3, name: "Estação Recife", type: "Metrô", rating: 3.8 },
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Perfil</h1>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-start">
            <Avatar className="h-20 w-20 bg-purple-100 text-purple-600">
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>

            <div className="mt-4 text-center sm:ml-6 sm:mt-0 sm:text-left">
              <h2 className="text-xl font-bold text-gray-800">Joanna Darc</h2>
              <p className="text-gray-500">juaninha@email.com</p>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Editar perfil
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="settings" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="locations">Meus Locais</TabsTrigger>
          </TabsList>

          <TabsContent
            value="settings"
            className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Modo offline</p>
                  <p className="text-sm text-gray-500">Usar o aplicativo sem conexão com internet</p>
                </div>
              </div>
              <Switch
                checked={offlineMode}
                onCheckedChange={setOfflineMode}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Idioma</p>
                  <p className="text-sm text-gray-500">Selecione o idioma do aplicativo</p>
                </div>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Notificações</p>
                  <p className="text-sm text-gray-500">Receber alertas de segurança</p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Modo escuro</p>
                  <p className="text-sm text-gray-500">Mudar para tema escuro</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} className="data-[state=checked]:bg-purple-600" />
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full gap-2 text-red-600 hover:bg-red-50 hover:text-red-700">
                <LogOut className="h-4 w-4" />
                Sair da conta
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="mt-4">
            <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-800">
                <Star className="h-5 w-5 text-purple-600" />
                Locais avaliados
              </h3>

              <div className="space-y-3">
                {ratedLocations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{location.name}</p>
                      <p className="text-xs text-gray-500">Avaliado em {location.date}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-sm font-medium text-purple-800">
                      <Star className="h-3 w-3 fill-purple-500 text-purple-500" />
                      {location.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-800">
                <MapPin className="h-5 w-5 text-purple-600" />
                Locais salvos
              </h3>

              <div className="space-y-3">
                {savedLocations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{location.name}</p>
                      <p className="text-xs text-gray-500">{location.type}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-sm font-medium text-purple-800">
                      <Star className="h-3 w-3 fill-purple-500 text-purple-500" />
                      {location.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
