// Componente de cabeçalho do CRM

import Link from "next/link"
import { Briefcase, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo e título */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">CRM Pro</span>
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Oportunidades</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/clientes/novo" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Novo Cliente</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
