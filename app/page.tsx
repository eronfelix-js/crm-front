// Página principal - Lista de Oportunidades

"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { OportunidadesTable } from "@/components/oportunidades-table"
import { EtapaFilter } from "@/components/etapa-filter"
import { useToast } from "@/hooks/use-toast"
import { oportunidadeService } from "@/services/oportunidade-service"
import { Toaster } from "@/components/ui/toaster"
import type { Oportunidade, EtapaVenda } from "@/lib/types"

export default function HomePage() {
  const { toast } = useToast()

  // Estados
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([])
  const [filtroEtapa, setFiltroEtapa] = useState<string>("TODAS")
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  // Função para carregar oportunidades
  const carregarOportunidades = useCallback(async () => {
    setIsLoading(true)
    try {
      let data: Oportunidade[]

      if (filtroEtapa === "TODAS") {
        data = await oportunidadeService.listar()
      } else {
        data = await oportunidadeService.listarPorEtapa(filtroEtapa as EtapaVenda)
      }

      setOportunidades(data)
    } catch (error) {
      console.error("Erro ao carregar oportunidades:", error)
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar as oportunidades.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [filtroEtapa, toast])

  // Carrega oportunidades ao montar e quando filtro muda
  useEffect(() => {
    carregarOportunidades()
  }, [carregarOportunidades])

  // Handler para excluir oportunidade
  async function handleExcluir(id: number) {
    setIsDeleting(id)
    try {
      await oportunidadeService.excluir(id)
      setOportunidades((prev) => prev.filter((o) => o.id !== id))
      toast({
        title: "Sucesso!",
        description: "Oportunidade excluída com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir oportunidade:", error)
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a oportunidade.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  // Calcula valor total do pipeline
  const valorTotal = oportunidades.reduce((acc, o) => acc + o.valorEstimado, 0)
  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorTotal)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Cabeçalho da página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Oportunidades</h1>
          <p className="mt-1 text-muted-foreground">Gerencie seu pipeline de vendas</p>
        </div>

        {/* Cards de estatísticas */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total de Oportunidades</p>
            <p className="text-2xl font-bold">{oportunidades.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Valor Total do Pipeline</p>
            <p className="text-2xl font-bold">{valorFormatado}</p>
          </div>
        </div>

        {/* Barra de ações */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <EtapaFilter value={filtroEtapa} onChange={setFiltroEtapa} />

          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={carregarOportunidades} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="sr-only">Atualizar</span>
            </Button>
            <Button asChild>
              <Link href="/oportunidades/nova">
                <Plus className="mr-2 h-4 w-4" />
                Nova Oportunidade
              </Link>
            </Button>
          </div>
        </div>

        {/* Tabela de oportunidades */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <OportunidadesTable oportunidades={oportunidades} onExcluir={handleExcluir} isDeleting={isDeleting} />
        )}
      </main>

      <Toaster />
    </div>
  )
}
