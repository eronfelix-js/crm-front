// Componente de badge para exibir a etapa da venda

import { cn } from "@/lib/utils"
import { type EtapaVenda, etapaLabels, etapaColors } from "@/lib/types"

interface EtapaBadgeProps {
  etapa: EtapaVenda
  className?: string
}

export function EtapaBadge({ etapa, className }: EtapaBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        etapaColors[etapa],
        className,
      )}
    >
      {etapaLabels[etapa]}
    </span>
  )
}
