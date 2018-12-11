import * as onHeaders from 'on-headers'
import { metrics } from '../shared'

const http_request_count = metrics.createCounter('http_request_count', ['route_id'])
const http_client_error_count = metrics.createCounter('http_client_error_count', ['route_id'])
const http_server_error_count = metrics.createCounter('http_server_error_count', ['route_id'])
const http_response_time_millis = metrics.createSummary('http_response_time_millis', ['route_id'])

const logRequest = (res, route_id: string) => {
  const start = process.hrtime()
  const label = { route_id }    
  onHeaders(res, () => {
    
    http_request_count.inc(label, 1)

    if (res.statusCode >= 400 && res.statusCode < 500) {
      http_client_error_count.inc(label, 1)
    }

    if (res.statusCode >= 500) {
      http_server_error_count.inc(label, 1)
    }

    http_response_time_millis.observe(label, metrics.getTimerMillis(start))

  })
} 

const requestMetrics = (req, res, next) => {
  const name = req.baseUrl.substring(1).replace('/', '_').toLowerCase()
  logRequest(req, name)
  next()
}

const namedRequestMetrics = (routeId: string) => {
  return (req, res, next) => {
    logRequest(res, routeId)
    next()
  }
}

export {
  requestMetrics,
  namedRequestMetrics
} 
