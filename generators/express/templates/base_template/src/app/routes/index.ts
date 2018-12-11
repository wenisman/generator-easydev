import { Router } from 'express'
import * as bodyParser from 'body-parser'
import * as expressHealthcheck from 'express-healthcheck'

import { errors, metrics, trace } from '../middlewares'
import * as shared from '../shared'

import  * as sampleRouter from './sample'

const router: Router = Router()
const setupRoutes = (swaggerValidator) => {

  router.use('/healthcheck', expressHealthcheck())

  router.use('/metrics', (req, res, next) => {
    res.contentType("text/plain")
    res.send(shared.metrics.registry.metrics())
  })

  // addition of standard middlewares
  router.use(
    trace,
    bodyParser.json(),
  )

  router
    .get('/sample/testGet/:pathParam', swaggerValidator.validate, metrics.requestMetrics, sampleRouter.getSampleAction())
    .post('/sample/testSet', swaggerValidator.validate, metrics.requestMetrics, sampleRouter.setSampleAction())

  router.use(errors)
  return router
}

export {
 setupRoutes
}
