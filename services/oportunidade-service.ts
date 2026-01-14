// Serviço para operações de Oportunidade

import { api } from "@/lib/api"
import type { Oportunidade, CreateOportunidadeDTO, UpdateOportunidadeDTO, EtapaVenda } from "@/lib/types"
import { mockOportunidades, delay } from "./mock-data"
import { clientesData } from "./cliente-service"

// Flag para usar dados mock (true no preview, false em produção)
const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL

// Armazena oportunidades em memória para o modo mock
const oportunidadesData = [...mockOportunidades]
let nextId = Math.max(...oportunidadesData.map((o) => Number(o.id))) + 1

export const oportunidadeService = {
  /**
   * Lista todas as oportunidades
   */
  async listar(): Promise<Oportunidade[]> {
    if (USE_MOCK) {
      await delay(400)
      return [...oportunidadesData]
    }

    const response = await api.oportunidades.listar()
    return response.data
  },

  /**
   * Busca uma oportunidade por ID
   */
  async buscarPorId(id: number): Promise<Oportunidade> {
    if (USE_MOCK) {
      await delay(300)
      const oportunidade = oportunidadesData.find((o) => o.id === id)
      if (!oportunidade) {
        throw new Error("Oportunidade não encontrada")
      }
      return { ...oportunidade }
    }

    const response = await api.oportunidades.buscarPorId(id)
    return response.data
  },

  /**
   * Lista oportunidades por etapa
   */
  async listarPorEtapa(etapa: EtapaVenda): Promise<Oportunidade[]> {
    if (USE_MOCK) {
      await delay(300)
      return oportunidadesData.filter((o) => o.etapa === etapa)
    }

    const response = await api.oportunidades.listar()
    return response.data
  },

  /**
   * Cria uma nova oportunidade
   */
  async criar(data: CreateOportunidadeDTO): Promise<Oportunidade> {
    if (USE_MOCK) {
      await delay(500)
      const cliente = clientesData.find((c) => c.id === data.clienteId)
      if (!cliente) {
        throw new Error("Cliente não encontrado")
      }
      const novaOportunidade: Oportunidade = {
        id: nextId++,
        titulo: data.titulo,
        valorEstimado: data.valorEstimado,
        etapa: data.etapa,
        cliente,
        dataCriacao: new Date().toISOString(),
      }
      oportunidadesData.push(novaOportunidade)
      return novaOportunidade
    }

    const response = await api.oportunidades.criar(data)
    return response.data
  },

  /**
   * Atualiza uma oportunidade existente
   */
  async atualizar(id: number, data: UpdateOportunidadeDTO): Promise<Oportunidade> {
    if (USE_MOCK) {
      await delay(500)
      const index = oportunidadesData.findIndex((o) => o.id === id)
      if (index === -1) {
        throw new Error("Oportunidade não encontrada")
      }

      const cliente = data.clienteId
        ? clientesData.find((c) => c.id === data.clienteId)
        : oportunidadesData[index].cliente

      oportunidadesData[index] = {
        ...oportunidadesData[index],
        titulo: data.titulo ?? oportunidadesData[index].titulo,
        valorEstimado: data.valorEstimado ?? oportunidadesData[index].valorEstimado,
        etapa: data.etapa ?? oportunidadesData[index].etapa,
        cliente: cliente!,
      }

      return { ...oportunidadesData[index] }
    }

    const response = await api.oportunidades.atualizar(id, data)
    return response.data
  },

  /**
   * Exclui uma oportunidade
   */
  async excluir(id: number): Promise<void> {
    if (USE_MOCK) {
      await delay(400)
      const index = oportunidadesData.findIndex((o) => o.id === id)
      if (index === -1) {
        throw new Error("Oportunidade não encontrada")
      }
      oportunidadesData.splice(index, 1)
      return
    }

    await api.oportunidades.deletar(id)
  },
}
