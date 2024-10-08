import express from 'express'
import type { Express } from 'express'
import MemberController from '@/domains/member/controllers'
import { Middleware } from '@/domains/auth/middleware'

// TODO Type the Request Handler
const MemberRouting = (app: Express) => {
  const memberRouter = express.Router()

  memberRouter.get(
    '/',
    Middleware.requireAuthentication,
    MemberController.getMember as any
  )
  memberRouter.post('/social', MemberController.createMember as any)

  app.use(`${process.env.API_VERSION}/member`, memberRouter)
}

export default MemberRouting
