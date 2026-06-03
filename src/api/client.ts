import axios from 'axios'
import type { Visitor, ScrumItem } from '../types'

// Dev/Docker: empty → Vite proxy or nginx proxy handles /api/
// Production (Vercel): set VITE_API_URL=https://your-backend.onrender.com
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? '' })

export const visitorsApi = {
  count: () => api.get<{ count: number }>('/api/visitors/count').then(r => r.data),
  list: (token: string) =>
    api.get<Visitor[]>('/api/visitors', { params: { token } }).then(r => r.data),
}

export const scrumApi = {
  list: () => api.get<ScrumItem[]>('/api/scrum').then(r => r.data),
  create: (token: string, data: Partial<ScrumItem>) =>
    api.post<ScrumItem>('/api/scrum', data, { params: { token } }).then(r => r.data),
  update: (token: string, id: number, data: Partial<ScrumItem>) =>
    api.put<ScrumItem>(`/api/scrum/${id}`, data, { params: { token } }).then(r => r.data),
  remove: (token: string, id: number) =>
    api.delete(`/api/scrum/${id}`, { params: { token } }),
  verifyToken: (token: string) =>
    api.post<{ valid: boolean }>('/api/scrum/verify-token', { token }).then(r => r.data),
}
