import { api } from '../../config/api'

const routes = {
  getAll: '/problems'
}

export const getAll = (dataHandler) => {
  return api.get(routes.getAll, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('API_TOKEN')}`
    }
  })
    .then((response) => {
      console.log(response)
      dataHandler(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
