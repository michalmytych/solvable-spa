import { api } from '../../config/api'
import { Buffer } from 'buffer'

const routes = {
  getAll: '/solutions',
  commit: (problemId) => `/solutions/${problemId}/commit`,
}

const solutionStatuses = {
  0: 'Empty',
  1: 'Received',
  2: 'Validated',
  3: 'Invalid language used',
  4: 'Characters limit exceeded',
  5: 'Empty decoding result',
  6: 'Malformed UTF-8 code string',
  7: 'Invalid',
  8: 'Delegated',
  9: 'Passed all tests',
  10: 'Failed tests',
  11: 'Interrupted'
}

export const getAll = (dataHandler) => {
  return api.get(routes.getAll).then((response) => dataHandler(response.data))
}

export const commit = (data, responseHandler) => {
  return api.post(routes.commit(data.problem?.id), {
    data: {
      code_language_id: data.language?.id,
      code: Buffer.from(data.code).toString('base64')
    }
  })
    .then((response) => responseHandler(response))
}

export const resolveSolutionStatus = (key) => {
  return solutionStatuses[key] ?? '-'
}
