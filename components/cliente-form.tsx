// Formulário para cadastro de cliente

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { clienteService } from "@/services/cliente-service"

export function ClienteForm() {
  const router = useRouter()
  const { toast } = useToast()

  // Estado do formulário
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Handler de submissão
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validações
    if (!nome.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe o nome do cliente.",
        variant: "destructive",
      })
      return
    }

    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, informe um email válido.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await clienteService.criar({
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
      })

      toast({
        title: "Sucesso!",
        description: "Cliente cadastrado com sucesso.",
      })

      router.push("/")
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error)
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar o cliente. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Formatação do telefone
  function handleTelefoneChange(value: string) {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, "")

    // Aplica máscara (XX) XXXXX-XXXX
    let formatted = numbers
    if (numbers.length > 2) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    }
    if (numbers.length > 7) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }

    setTelefone(formatted)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo: Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              placeholder="Ex: João da Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Campo: Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ex: joao@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Campo: Telefone */}
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              placeholder="Ex: (11) 99999-9999"
              value={telefone}
              onChange={(e) => handleTelefoneChange(e.target.value)}
              disabled={isLoading}
              maxLength={15}
            />
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar
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
