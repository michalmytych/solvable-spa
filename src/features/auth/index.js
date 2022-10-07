import { api } from '../../config/api'

const routes = {
  login: '/login'
}

const saveApiToken = (token) => {
  window.localStorage.setItem('API_TOKEN', token)
}

const removeApiToken = () => {
  window.localStorage.removeItem('API_TOKEN')
}

export const isUserAuthenticated = () => {
  return Boolean(window.localStorage.getItem('API_TOKEN'))
}

export const login = (data, successHandler, failHandler) => {
  return api.post(routes.login, {
    email: data?.email,
    password: data?.password
  })
    .then((response) => {
      saveApiToken(response.data?.token)
      successHandler()
    })
    .catch(failHandler)
}

export const logout = () => {
  removeApiToken()
}

