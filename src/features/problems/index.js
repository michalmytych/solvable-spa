import { api } from '../../config/api'

const routes = {
  getAll: '/problems'
}

export const getAll = (dataHandler, alertSetter) => {
  return api
    .get(routes.getAll)
    .then((response) => dataHandler(response.data))
    .catch((response) => alertSetter({ content: response.message }))
}
