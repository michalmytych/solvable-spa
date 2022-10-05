import { api } from '../../config/api'
import { Buffer } from 'buffer'

const routes = {
  getAll: '/solutions',
  commit: (problemId) => `/solutions/${problemId}/commit`,
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

export const commit = (data, responseHandler) => {
  console.log({
    code_language_id: data.langauge?.id,
    code: Buffer.from(data.code).toString('base64')
  });

  return api.post(routes.commit(data.problem?.id), {
    data: {
      code_language_id: data.language?.id,
      code: Buffer.from(data.code).toString('base64')
    }
  }, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('API_TOKEN')}`
    }
  })
    .then((response) => {
      console.log(response)
      responseHandler(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
