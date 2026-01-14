// Configuração base do Axios e instância da API

import axios from "axios"

// Configuração da baseURL - altere para o endereço do seu backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Instância configurada do Axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)
