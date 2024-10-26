import express from 'express'
import type { Express } from 'express'

import { AuthController } from '../controllers'

const AuthenticationRouting = (app: Express) => {
  const authRouter = express.Router()

  authRouter.get('/', AuthController.authenticateUser)

  app.use(`${process.env.API_VERSION}/auth`, authRouter)
}

export default AuthenticationRouting
