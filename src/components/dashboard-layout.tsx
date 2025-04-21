"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Map, Search, MessageSquare, User, Menu, X, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Mapa", href: "/dashboard", icon: Map },
    { name: "Buscar", href: "/dashboard/search", icon: Search },
    { name: "Comunidade", href: "/dashboard/community", icon: MessageSquare },
    { name: "Perfil", href: "/dashboard/profile", icon: User },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden border-r border-gray-200 bg-white md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <Shield className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-purple-600">SeguraMulher</span>
          </div>
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${isActive ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="mx-3 mb-6 mt-auto rounded-lg bg-purple-50 p-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-purple-600" />
              <h3 className="ml-2 text-sm font-medium text-purple-800">Avalie um local</h3>
            </div>
            <p className="mt-1 text-xs text-purple-600">Compartilhe sua experiência e ajude outras mulheres.</p>
            <Button size="sm" className="mt-3 w-full bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/dashboard/rate">Avaliar agora</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col overflow-y-auto bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-5">
              <div className="flex items-center">
                <Shield className="h-7 w-7 text-purple-600" />
                <span className="ml-2 text-lg font-bold text-purple-600">SeguraMulher</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${isActive ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="mx-3 mb-6 mt-auto rounded-lg bg-purple-50 p-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-purple-600" />
                <h3 className="ml-2 text-sm font-medium text-purple-800">Avalie um local</h3>
              </div>
              <p className="mt-1 text-xs text-purple-600">Compartilhe sua experiência e ajude outras mulheres.</p>
              <Button
                size="sm"
                className="mt-3 w-full bg-purple-600 hover:bg-purple-700"
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/dashboard/rate">Avaliar agora</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white md:hidden">
          <div className="flex flex-1 items-center justify-between px-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
              <div className="ml-2 flex items-center">
                <Shield className="h-7 w-7 text-purple-600" />
                <span className="ml-2 text-lg font-bold text-purple-600">SeguraMulher</span>
              </div>
            </div>
            <div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
                <Link href="/dashboard/rate">Avaliar</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
