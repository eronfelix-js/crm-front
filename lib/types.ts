// Tipos e interfaces do CRM

// lib/types.ts
export interface Oportunidade {
  id: string; // Se o backend retorna Long como string
  titulo: string;
  valorEstimado: string; // Se BigDecimal é enviado como string
  etapa: EtapaVenda;
  cliente: Cliente;
  dataCriacao: string;
}

export enum EtapaVenda {
  PROSPECCAO = "PROSPECCAO",
  QUALIFICACAO = "QUALIFICACAO",
  PROPOSTA = "PROPOSTA",
  FECHADO = "FECHADO",
}

export interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
}

export interface CreateClienteDTO {
  nome: string
  email: string
  telefone: string
}

export interface CreateOportunidadeDTO {
  titulo: string
  valorEstimado: number
  etapa: EtapaVenda
  clienteId: number
}

export interface UpdateOportunidadeDTO {
  titulo?: string
  valorEstimado?: number
  etapa?: EtapaVenda
  clienteId?: number
}

export interface Venda {
  id: number
  titulo: string
  valor: number
  dataVenda: string
  cliente: Cliente
}

export interface CreateVendaDTO {
  titulo: string
  valor: number
  dataVenda: string
  clienteId: number
}

export interface UpdateVendaDTO {
  titulo?: string
  valor?: number
  dataVenda?: string
  clienteId?: number
}

// Labels em português para as etapas
export const etapaLabels: Record<EtapaVenda, string> = {
  [EtapaVenda.PROSPECCAO]: "Prospecção",
  [EtapaVenda.QUALIFICACAO]: "Qualificação",
  [EtapaVenda.PROPOSTA]: "Proposta",
  [EtapaVenda.FECHADO]: "Fechado",
}

// Cores para cada etapa
export const etapaColors: Record<EtapaVenda, string> = {
  [EtapaVenda.PROSPECCAO]: "bg-prospeccao text-white",
  [EtapaVenda.QUALIFICACAO]: "bg-qualificacao text-foreground",
  [EtapaVenda.PROPOSTA]: "bg-proposta text-white",
  [EtapaVenda.FECHADO]: "bg-fechado text-white",
}
