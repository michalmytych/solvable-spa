import { api } from '../../config/api'

const routes = {
  getAll: '/code-languages'
}

export const getAll = () => api.get(routes.getAll)
