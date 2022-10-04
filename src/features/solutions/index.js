import { api } from '../../config/api'

const routes = {
  getAll: '/solutions'
}

export const getAll = () => {
  return api.appRequest(routes.getAll)
}
