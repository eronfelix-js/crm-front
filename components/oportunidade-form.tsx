// Formulário reutilizável para criar/editar oportunidades

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { clienteService } from "@/services/cliente-service"
import { oportunidadeService } from "@/services/oportunidade-service"
import { EtapaVenda, etapaLabels } from "@/lib/types"
import type { Cliente, Oportunidade } from "@/lib/types"

interface OportunidadeFormProps {
  oportunidade?: Oportunidade
  isEditing?: boolean
}

export function OportunidadeForm({ oportunidade, isEditing = false }: OportunidadeFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  // Estado do formulário
  const [titulo, setTitulo] = useState(oportunidade?.titulo || "")
  const [valorEstimado, setValorEstimado] = useState(oportunidade?.valorEstimado?.toString() || "")
  const [etapa, setEtapa] = useState<EtapaVenda>(oportunidade?.etapa || EtapaVenda.PROSPECCAO)
  const [clienteId, setClienteId] = useState<string>(oportunidade?.cliente?.id?.toString() || "")

  // Estado de carregamento
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingClientes, setIsLoadingClientes] = useState(true)

  // Carrega lista de clientes ao montar o componente
  useEffect(() => {
    async function carregarClientes() {
      try {
        const data = await clienteService.listar()
        setClientes(data)
      } catch (error) {
        console.error("Erro ao carregar clientes:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de clientes.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingClientes(false)
      }
    }
    carregarClientes()
  }, [toast])

  // Handler de submissão do formulário
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validação básica
    if (!titulo.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe o título da oportunidade.",
        variant: "destructive",
      })
      return
    }

    if (!valorEstimado || Number.parseFloat(valorEstimado) <= 0) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe um valor estimado válido.",
        variant: "destructive",
      })
      return
    }

    if (!clienteId) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione um cliente.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const dados = {
        titulo: titulo.trim(),
        valorEstimado: Number.parseFloat(valorEstimado),
        etapa,
        clienteId: Number.parseInt(clienteId),
      }

      if (isEditing && oportunidade?.id) {
        await oportunidadeService.atualizar(oportunidade.id, dados)
        toast({
          title: "Sucesso!",
          description: "Oportunidade atualizada com sucesso.",
        })
      } else {
        await oportunidadeService.criar(dados)
        toast({
          title: "Sucesso!",
          description: "Oportunidade criada com sucesso.",
        })
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Erro ao salvar oportunidade:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar a oportunidade. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Oportunidade" : "Nova Oportunidade"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo: Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Ex: Projeto de consultoria"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Campo: Valor Estimado */}
          <div className="space-y-2">
            <Label htmlFor="valorEstimado">Valor Estimado (R$)</Label>
            <Input
              id="valorEstimado"
              type="number"
              step="0.01"
              min="0"
              placeholder="Ex: 50000.00"
              value={valorEstimado}
              onChange={(e) => setValorEstimado(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Campo: Etapa */}
          <div className="space-y-2">
            <Label htmlFor="etapa">Etapa</Label>
            <Select value={etapa} onValueChange={(value) => setEtapa(value as EtapaVenda)} disabled={isLoading}>
              <SelectTrigger id="etapa">
                <SelectValue placeholder="Selecione a etapa" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EtapaVenda).map((e) => (
                  <SelectItem key={e} value={e}>
                    {etapaLabels[e]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campo: Cliente */}
          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Select value={clienteId} onValueChange={setClienteId} disabled={isLoading || isLoadingClientes}>
              <SelectTrigger id="cliente">
                <SelectValue placeholder={isLoadingClientes ? "Carregando clientes..." : "Selecione um cliente"} />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={cliente.id.toString()}>
                    {cliente.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {clientes.length === 0 && !isLoadingClientes && (
              <p className="text-sm text-muted-foreground">
                Nenhum cliente cadastrado.{" "}
                <a href="/clientes/novo" className="text-primary hover:underline">
                  Cadastrar cliente
                </a>
              </p>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Atualizar" : "Salvar"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isLoading}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
