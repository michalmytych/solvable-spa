import { api } from '../../config/api'

const routes = {
  getAll: '/code-languages'
}

export const getAll = (dataHandler) => {
  return api.get(routes.getAll).then((response) => dataHandler(response.data))
}
