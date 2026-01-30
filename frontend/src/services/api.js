import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Employee API
export const employeeAPI = {
  getAll: () => api.get('/api/employees'),
  getById: (id) => api.get(`/api/employees/${id}`),
  create: (data) => api.post('/api/employees', data),
  delete: (id) => api.delete(`/api/employees/${id}`),
}

// Attendance API
export const attendanceAPI = {
  getAll: (params) => api.get('/api/attendance', { params }),
  getById: (id) => api.get(`/api/attendance/${id}`),
  create: (data) => api.post('/api/attendance', data),
  delete: (id) => api.delete(`/api/attendance/${id}`),
}

export default api
