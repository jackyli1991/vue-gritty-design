import { defineErrorHandler } from 'nitro'
import { errorResponse } from './utils'

export default defineErrorHandler((error, event: H3Event) => {
  console.error('Custom Error Handler:', error, event)
  const status = error.status

  if (status === 404) {
    event.res.status = 404
    event.res.headers.set('Content-Type', 'application/json')
    return errorResponse('notFound')
  }
})
