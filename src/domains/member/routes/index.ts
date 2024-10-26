import express from 'express'
import type { Express } from 'express'
import MemberController from '@/domains/member/controllers'
import { AuthMiddleware } from '@/domains/auth/middleware'

const MemberRouting = (app: Express) => {
  const memberRouter = express.Router()

  memberRouter.get('/', AuthMiddleware, MemberController.getMember)
  memberRouter.post('/social', MemberController.createMember)

  app.use(`${process.env.API_VERSION}/member`, memberRouter)
}

export default MemberRouting
