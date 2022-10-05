import { api } from '../../config/api'

const routes = {
  login: '/login'
}

export const login = () => {
  return api.post(routes.login, {
    email: 'luciano61@example.com',
    password: 'password'
  })
    .then((response) => {
      console.log(response)
      window.localStorage.setItem('API_TOKEN', response.data.token)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const logout = () => {
  window.localStorage.removeItem('API_TOKEN')
}

