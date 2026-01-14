// Página de criação de nova venda

import { Header } from "@/components/header"
import { VendaForm } from "@/components/venda-form"
import { Toaster } from "@/components/ui/toaster"

export default function NovaVendaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Nova Venda</h1>
          <p className="mt-1 text-muted-foreground">Registre uma nova venda realizada</p>
        </div>

        <VendaForm />
      </main>

      <Toaster />
    </div>
  )
}