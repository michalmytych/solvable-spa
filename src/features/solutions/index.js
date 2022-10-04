import { api } from '../../config/api'

const routes = {
  getAll: '/solutions'
}

export const getAll = () => {
  return api.get(routes.getAll, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('API_TOKEN')}`
    }
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
