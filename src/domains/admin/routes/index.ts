import express from 'express'
import type { Express, Request, Response, NextFunction } from 'express'
import { AdminController } from '@/domains/admin/controllers'

const AdminRouting = (app: Express) => {
  const adminRouter = express.Router()

  // Health check endpoint - always available
  adminRouter.get('/health', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AdminController.healthCheck(req, res)
    } catch (error) {
      next(error)
    }
  })

  // Only expose this in demo environment
  if (process.env.NODE_ENV === 'demo') {
    adminRouter.post('/reset-demo', async (req: Request, res: Response, next: NextFunction) => {
      try {
        await AdminController.resetDemo(req, res)
      } catch (error) {
        next(error)
      }
    })
  }

  app.use(`${process.env.API_VERSION}/admin`, adminRouter)
}

export default AdminRouting
