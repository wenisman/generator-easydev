import * as _ from 'lodash'
import { childLogger } from '../shared/logger'

const logger = childLogger(__filename)

const errors = (err, req, res, next) => {

  logger.error({ traceToken: req.traceToken, err }, 'error occurred')

  return res.status(500).json(_.pick(err, ['message', 'name']))
  
}

export default errors
