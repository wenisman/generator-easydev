import * as uuidv4 from 'uuid/v4'
import { logger } from '../shared'

const middleware = (req: any, res, next) => {
  req.traceToken = req.get('x-trace-token') || uuidv4()
  const accessToken = req.get('x-access-token') || 'undefined'

  logger.info(`request with access token ${accessToken} assigned trace token ${req.traceToken}`)
  next()
}

export default middleware