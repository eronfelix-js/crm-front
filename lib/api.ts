// lib/api.ts (exemplo de atualização)
import axios from 'axios';
import { CreateClienteDTO, CreateOportunidadeDTO, UpdateOportunidadeDTO } from './types';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Substitua pela URL real do backend
});

export const api = {
  oportunidades: {
    listar: () => apiClient.get('/oportunidades'),
    criar: (data: CreateOportunidadeDTO) => apiClient.post('/oportunidades', data),
    atualizar: (id: number, data: UpdateOportunidadeDTO) => apiClient.put(`/oportunidades/${id}`, data),
    deletar: (id: number) => apiClient.delete(`/oportunidades/${id}`),
  },
  clientes: {
    listar: () => apiClient.get('/clientes'),
    criar: (data: CreateClienteDTO) => apiClient.post('/clientes', data),
    // etc.
  },
};