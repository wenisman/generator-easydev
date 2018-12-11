import * as assert from 'assert'

import config from './shared/config'
import logger from './shared/logger'
import * as metrics from './shared/metrics'

import * as server from './server'

const port = config('HTTP_PORT')
server.setup()
  .then((app) => {
    app.listen(port, () => {
      logger.info(`Express server running at http://0.0.0.0:${port}/`)
    })
  })
