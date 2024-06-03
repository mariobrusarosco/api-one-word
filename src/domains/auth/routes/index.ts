import express from 'express'
import type { Express } from 'express'
import AuthController from '../controllers/auth-controller'

const AuthenticationRouting = (app: Express) => {
  const authRouter = express.Router()

  authRouter.post('/', AuthController.authenticateUser)
  authRouter.get('/', AuthController.getAuthenticatedUser)

  app.use(`${process.env.API_VERSION}/auth`, authRouter)
}

export default AuthenticationRouting
