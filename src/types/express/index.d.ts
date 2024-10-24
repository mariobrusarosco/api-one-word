import { DemoMember } from '@/domains/auth/typing/interfaces'
import { Member } from '@prisma/client'
import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      authenticatedUser: Member | DemoMember
    }
  }
}
