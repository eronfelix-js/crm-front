// Serviço para operações de Cliente

import { api } from "@/lib/api"
import type { Cliente, CreateClienteDTO } from "@/lib/types"
import { mockClientes, delay } from "./mock-data"

// Flag para usar dados mock (true no preview, false em produção)
const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL

// Armazena clientes em memória para o modo mock
const clientesData = [...mockClientes]
let nextId = clientesData.length > 0 ? Math.max(...clientesData.map((c) => c.id)) + 1 : 1

export const clienteService = {
  /**
   * Cria um novo cliente
   */
  async criar(data: CreateClienteDTO): Promise<Cliente> {
    if (USE_MOCK) {
      await delay(500)
      const novoCliente: Cliente = {
        id: nextId++,
        ...data,
      }
      clientesData.push(novoCliente)
      return novoCliente
    }

    const response = await api.clientes.criar(data)
    return response.data
  },

  /**
   * Lista todos os clientes
   */
  async listar(): Promise<Cliente[]> {
    if (USE_MOCK) {
      await delay(300)
      return [...clientesData]
    }

    const response = await api.clientes.listar()
    return response.data
  },
}

export { clientesData }
