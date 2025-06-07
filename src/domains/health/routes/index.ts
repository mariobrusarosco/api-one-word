import express from 'express'
import type { Express } from 'express'
import { HealthController } from '@/domains/health/controllers'

const HealthRouting = (app: Express) => {
  const healthRouter = express.Router()

  healthRouter.get('/health', HealthController.getHealthStatus)

  app.use(`${process.env.API_VERSION}/health`, healthRouter)
}

export default HealthRouting
