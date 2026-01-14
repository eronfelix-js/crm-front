// Filtro por etapa de venda

"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EtapaVenda, etapaLabels } from "@/lib/types"

interface EtapaFilterProps {
  value: string
  onChange: (value: string) => void
}

export function EtapaFilter({ value, onChange }: EtapaFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filtrar por etapa" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="TODAS">Todas as etapas</SelectItem>
        {Object.values(EtapaVenda).map((etapa) => (
          <SelectItem key={etapa} value={etapa}>
            {etapaLabels[etapa]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
