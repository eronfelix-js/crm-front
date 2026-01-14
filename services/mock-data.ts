// Dados mock para demonstração do CRM

import { EtapaVenda } from "@/lib/types"
import type { Cliente, Oportunidade, Venda } from "@/lib/types"

// Clientes de exemplo
export const mockClientes: Cliente[] = [
  { id: 1, nome: "TechCorp Ltda", email: "contato@techcorp.com", telefone: "(11) 99999-1111" },
  { id: 2, nome: "Inovação S.A.", email: "comercial@inovacao.com", telefone: "(21) 98888-2222" },
  { id: 3, nome: "StartupXYZ", email: "hello@startupxyz.io", telefone: "(31) 97777-3333" },
  { id: 4, nome: "Consulting Pro", email: "info@consultingpro.com.br", telefone: "(41) 96666-4444" },
  { id: 5, nome: "Digital Solutions", email: "vendas@digitalsolutions.com", telefone: "(51) 95555-5555" },
]

// Oportunidades de exemplo
export const mockOportunidades: Oportunidade[] = [
  {
    id: 1,
    titulo: "Implantação de ERP",
    valorEstimado: 150000,
    etapa: EtapaVenda.PROPOSTA,
    cliente: mockClientes[0],
  },
  {
    id: 2,
    titulo: "Consultoria em Cloud",
    valorEstimado: 45000,
    etapa: EtapaVenda.QUALIFICACAO,
    cliente: mockClientes[1],
  },
  {
    id: 3,
    titulo: "Desenvolvimento de App Mobile",
    valorEstimado: 85000,
    etapa: EtapaVenda.PROSPECCAO,
    cliente: mockClientes[2],
  },
  {
    id: 4,
    titulo: "Treinamento de Equipe",
    valorEstimado: 12000,
    etapa: EtapaVenda.FECHADO,
    cliente: mockClientes[3],
  },
  {
    id: 5,
    titulo: "Migração de Dados",
    valorEstimado: 28000,
    etapa: EtapaVenda.PROPOSTA,
    cliente: mockClientes[4],
  },
  {
    id: 6,
    titulo: "Suporte Técnico Anual",
    valorEstimado: 36000,
    etapa: EtapaVenda.QUALIFICACAO,
    cliente: mockClientes[0],
  },
]

// Vendas de exemplo
export const mockVendas: Venda[] = [
  {
    id: 1,
    titulo: "Treinamento de Equipe",
    valor: 12000,
    dataVenda: "2024-01-10",
    cliente: mockClientes[3],
  },
  {
    id: 2,
    titulo: "Consultoria em Marketing",
    valor: 25000,
    dataVenda: "2024-01-05",
    cliente: mockClientes[1],
  },
]

// Funções auxiliares para simular delay de rede
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
