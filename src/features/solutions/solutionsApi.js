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

export const resolveSolutionStatus = (key) => solutionStatuses[key] ?? '-'

export const getAll = () => api.get(routes.getAll)

export const commit = (data, responseHandler, alertSetter) => {
  return api
    .post(routes.commit(data.problem?.id), {
      data: {
        code_language_id: data.language?.id,
        code: Buffer.from(data.code).toString('base64')
      }
    })
    .then((response) => responseHandler(response))
    .catch((response) => alertSetter({ content: response.message }))
}
