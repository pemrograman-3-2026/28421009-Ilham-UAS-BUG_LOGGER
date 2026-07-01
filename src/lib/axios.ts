import axios from 'axios'
export const baseURL = 'http://localhost:3001'
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api