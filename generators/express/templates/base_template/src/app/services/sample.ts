import { childLogger } from '../shared/logger'
const logger = childLogger(__filename)

const sampleGetAction = (data) => { 
  // perform any computation and business logic here free of context of the request
  logger.debug(`Processing get request`)
  return `get request complete`
} 

const samplePostAction = (data) => { 
  // perform any computation and business logic here free of context of the request
  logger.debug(`Processing post request`)
  return `post request complete`
} 


export {
  sampleGetAction,
  samplePostAction
}
