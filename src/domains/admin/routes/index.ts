import express from 'express'
import type { Express } from 'express'
import { AdminController } from '@/domains/admin/controllers'

const AdminRouting = (app: Express) => {
  const adminRouter = express.Router()

  adminRouter.post('/reset-demo', AdminController.resetDemo)

  app.use(`${process.env.API_VERSION}/admin`, adminRouter)
}

export default AdminRouting
