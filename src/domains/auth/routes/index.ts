import express from 'express'
import type { Express } from 'express'
import AuthController from '../controllers/auth-controller'

// TODO Type the Request Handler
const AuthenticationRouting = (app: Express) => {
  const authRouter = express.Router()

  authRouter.post('/', AuthController.authenticateUser as any)
  authRouter.get('/', AuthController.getAuthenticatedUser as any)

  app.use(`${process.env.API_VERSION}/auth`, authRouter)
}

export default AuthenticationRouting
