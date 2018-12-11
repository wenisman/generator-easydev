import { childLogger } from '../../shared'

import * as sampleService from '../../services/sample'

const logger = childLogger(__filename)

const getSampleAction = () => {
  return (req: any, res, next) => {
    try {
      const result = sampleService.sampleGetAction({ ...req.query, ...req.params })
      res.status(200).json({ message: 'Sample Get Complete', result })
    } catch {
      next()
    }
  }
}

const setSampleAction = () => {
return (req: any, res, next) => {

  try {
      const result = sampleService.samplePostAction({ ...req.params, ...req.body })
      res.status(200).json({ message: 'Sample Post Complete', result })
    } catch {
      next()
    }
  }
}

export {
  getSampleAction,
  setSampleAction
}
