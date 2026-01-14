// Página de edição de oportunidade

"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw } from "lucide-react"
import { Header } from "@/components/header"
import { OportunidadeForm } from "@/components/oportunidade-form"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { oportunidadeService } from "@/services/oportunidade-service"
import type { Oportunidade } from "@/lib/types"

interface EditarOportunidadePageProps {
  params: Promise<{ id: string }>
}

export default function EditarOportunidadePage({ params }: EditarOportunidadePageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()

  const [oportunidade, setOportunidade] = useState<Oportunidade | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function carregarOportunidade() {
      try {
        const data = await oportunidadeService.buscarPorId(Number.parseInt(id))
        setOportunidade(data)
      } catch (error) {
        console.error("Erro ao carregar oportunidade:", error)
        toast({
          title: "Erro",
          description: "Oportunidade não encontrada.",
          variant: "destructive",
        })
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    carregarOportunidade()
  }, [id, router, toast])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Editar Oportunidade</h1>
          <p className="mt-1 text-muted-foreground">Atualize os dados da oportunidade</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : oportunidade ? (
          <OportunidadeForm oportunidade={oportunidade} isEditing />
        ) : null}
      </main>

      <Toaster />
    </div>
  )
}
