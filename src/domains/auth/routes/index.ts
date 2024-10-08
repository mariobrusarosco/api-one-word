import express from 'express'
import type { Express } from 'express'

import { Middleware } from '../middleware'
import { AuthController } from '../controllers'

// TODO Type the Request Handler
const AuthenticationRouting = (app: Express) => {
  const authRouter = express.Router()

  authRouter.get('/', AuthController.authenticateUser as any)
  // authRouter.get(
  //   '/',
  //   Middleware.requireAuthentication,
  //   AuthController.getAuthenticatedUser as any
  // )

  app.use(`${process.env.API_VERSION}/auth`, authRouter)
}

export default AuthenticationRouting
