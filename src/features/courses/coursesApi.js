import { api } from '../../config/api'

const routes = {
  getAll: '/courses'
}

export const getAll = () => api.get(routes.getAll)


