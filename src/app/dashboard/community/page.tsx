"use client"

import { useState } from "react"
import { MessageCircle, Heart, ThumbsUp, Filter, User } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("recent")

  const comments = [
    {
      id: 1,
      author: "Maria S.",
      location: "Parque Dona Lindu",
      date: "Hoje, 14:30",
      content:
        "Me senti muito segura correndo no parque durante a manhã. Há muitas pessoas e a segurança está sempre presente.",
      likes: 24,
      helpful: 18,
      isAnonymous: false,
    },
    {
      id: 2,
      author: "Anônima",
      location: "Terminal Integrado Joana Bezerra",
      date: "Ontem, 19:15",
      content:
        "Evitem a saída norte depois das 20h. Pouca iluminação e poucos seguranças. Prefiro dar a volta e sair pelo lado principal que é mais movimentado.",
      likes: 42,
      helpful: 37,
      isAnonymous: true,
    },
    {
      id: 3,
      author: "Juliana M.",
      location: "Shopping Recife",
      date: "2 dias atrás",
      content:
        "O estacionamento tem boa iluminação e seguranças. Me sinto segura mesmo à noite. Recomendo para quem precisa estacionar na região.",
      likes: 15,
      helpful: 12,
      isAnonymous: false,
    },
    {
      id: 4,
      author: "Anônima",
      location: "Rua da Aurora",
      date: "3 dias atrás",
      content:
        "Muito cuidado no horário de pico. Já presenciei casos de assédio e furtos. Mantenham-se atentas e de preferência não usem celular enquanto caminham.",
      likes: 56,
      helpful: 51,
      isAnonymous: true,
    },
    {
      id: 5,
      author: "Carla P.",
      location: "Marco Zero",
      date: "1 semana atrás",
      content:
        "Aos domingos é ótimo! A praça fica cheia de famílias. Nos dias de semana à noite, evito andar sozinha depois das 22h, principalmente nas ruas adjacentes.",
      likes: 38,
      helpful: 29,
      isAnonymous: false,
    },
  ]

  const sortedComments = [...comments].sort((a, b) => {
    if (activeTab === "recent") {
      // Simulando ordenação por data (mais recentes primeiro)
      return b.id - a.id
    } else if (activeTab === "helpful") {
      // Ordenando por mais úteis
      return b.helpful - a.helpful
    } else {
      // Ordenando por mais curtidos
      return b.likes - a.likes
    }
  })

  const [likedComments, setLikedComments] = useState<number[]>([])
  const [helpfulComments, setHelpfulComments] = useState<number[]>([])

  const handleLike = (commentId: number) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId))
    } else {
      setLikedComments([...likedComments, commentId])
    }
  }

  const handleMarkHelpful = (commentId: number) => {
    if (helpfulComments.includes(commentId)) {
      setHelpfulComments(helpfulComments.filter((id) => id !== commentId))
    } else {
      setHelpfulComments([...helpfulComments, commentId])
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Rede de Apoio</h1>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>

        <Tabs defaultValue="recent" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recentes</TabsTrigger>
            <TabsTrigger value="helpful">Mais úteis</TabsTrigger>
            <TabsTrigger value="liked">Mais curtidos</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <div key={comment.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 bg-purple-100 text-purple-600">
                    <AvatarFallback>
                      {comment.isAnonymous ? <User className="h-4 w-4" /> : comment.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <p className="font-medium text-gray-800">{comment.author}</p>
                    <p className="text-xs text-gray-500">{comment.date}</p>
                  </div>
                </div>
                <div className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                  {comment.location}
                </div>
              </div>

              <p className="mb-4 text-gray-700">{comment.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${likedComments.includes(comment.id)
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <Heart className={`h-3 w-3 ${likedComments.includes(comment.id) ? "fill-red-500" : ""}`} />
                    {comment.likes + (likedComments.includes(comment.id) ? 1 : 0)}
                  </button>

                  <button
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${helpfulComments.includes(comment.id)
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    onClick={() => handleMarkHelpful(comment.id)}
                  >
                    <ThumbsUp className={`h-3 w-3 ${helpfulComments.includes(comment.id) ? "fill-green-500" : ""}`} />
                    Útil ({comment.helpful + (helpfulComments.includes(comment.id) ? 1 : 0)})
                  </button>
                </div>

                <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200">
                  <MessageCircle className="h-3 w-3" />
                  Responder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
