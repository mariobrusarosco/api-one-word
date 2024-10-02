import { Member } from '@prisma/client'
import { Request } from 'express'

export type AppRequest = Request<any, any, any, Record<string, string>>

export interface AuthenticatedRequest extends Request {
  authenticatedUser: Member
  authenticated: boolean
}
