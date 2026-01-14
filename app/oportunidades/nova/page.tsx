// Página de criação de nova oportunidade

import { Header } from "@/components/header"
import { OportunidadeForm } from "@/components/oportunidade-form"
import { Toaster } from "@/components/ui/toaster"

export default function NovaOportunidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Nova Oportunidade</h1>
          <p className="mt-1 text-muted-foreground">Cadastre uma nova oportunidade de venda</p>
        </div>

        <OportunidadeForm />
      </main>

      <Toaster />
    </div>
  )
}
