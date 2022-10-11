import Cookies from 'js-cookie'
import { API_ROOT } from './constants'

const axios = require('axios')

export const api = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('API_TOKEN')}`
  }
})

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
  const isOtherThanGetMethod = config.method === 'post'
    || config.method === 'put'
    || config.method === 'delete'

  // If http method is `post | put | delete` and XSRF-TOKEN cookie is 
  // not present, call '/sanctum/csrf-cookie' to set CSRF token, then 
  // proceed with the initial response
  if (isOtherThanGetMethod && !Cookies.get('XSRF-TOKEN')) {
    return setCSRFToken(config).then(response => config)
  }

  return config
}

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The 
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = (config) => {
  const baseURL = config.baseURL.replace('/api', '')
  return api.get('/sanctum/csrf-cookie', { baseURL: baseURL }) // resolves to '/api/csrf-cookie'.
}

api.interceptors.request.use(onRequest, null)

export default api
