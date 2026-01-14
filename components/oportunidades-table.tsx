// Tabela de oportunidades com ações de editar e excluir

"use client"

import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { EtapaBadge } from "@/components/etapa-badge"
import type { Oportunidade } from "@/lib/types"

interface OportunidadesTableProps {
  oportunidades: Oportunidade[]
  onExcluir: (id: number) => void
  isDeleting?: number | null
}

// Formata valor em Real brasileiro
function formatarValor(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor)
}

export function OportunidadesTable({ oportunidades, onExcluir, isDeleting }: OportunidadesTableProps) {
  if (oportunidades.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
        <p className="text-muted-foreground">Nenhuma oportunidade encontrada</p>
        <Button asChild className="mt-4">
          <Link href="/oportunidades/nova">Criar primeira oportunidade</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-right">Valor Estimado</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {oportunidades.map((oportunidade) => (
            <TableRow key={oportunidade.id}>
              <TableCell className="font-medium">{oportunidade.titulo}</TableCell>
              <TableCell>{oportunidade.cliente?.nome || "N/A"}</TableCell>
              <TableCell className="text-right">{formatarValor(oportunidade.valorEstimado)}</TableCell>
              <TableCell>
                <EtapaBadge etapa={oportunidade.etapa} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/oportunidades/${oportunidade.id}/editar`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        disabled={isDeleting === oportunidade.id}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir a oportunidade <strong>{oportunidade.titulo}</strong>? Esta
                          ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onExcluir(oportunidade.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
