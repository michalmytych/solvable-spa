import { api } from '../../config/api'

const routes = {
  getAll: '/problems'
}

export const getAll = () => api.get(routes.getAll)
