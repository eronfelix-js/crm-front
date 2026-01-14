// Página de cadastro de cliente

import { Header } from "@/components/header"
import { ClienteForm } from "@/components/cliente-form"
import { Toaster } from "@/components/ui/toaster"

export default function NovoClientePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Novo Cliente</h1>
          <p className="mt-1 text-muted-foreground">Cadastre um novo cliente no sistema</p>
        </div>

        <ClienteForm />
      </main>

      <Toaster />
    </div>
  )
}
