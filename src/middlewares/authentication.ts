import { NextFunction, Request, Response } from 'express'
import { GlobalErrorMapper } from '../domains/shared/error-handling/mapper'
import { Member } from '@prisma/client'
import jwt from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
  authenticatedUser: Member
}

const skipAuthWhenCreatingAnAccount = (req: Request) => {
  const { headers } = req
  const isAuthViaDemo = headers['x-auth-demo']

  return isAuthViaDemo ? true : false
}

const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (skipAuthWhenCreatingAnAccount(req)) return next()

  try {
    const secret = process.env.JWT_SECRET || ''
    const authCookie = req.cookies['one_word_auth'] || ''
    const decodedToken = jwt.verify(authCookie, secret) as Member
    const authenticatedReq = req as AuthenticatedRequest

    authenticatedReq.authenticatedUser = decodedToken
    next()
  } catch (error) {
    return res
      .status(GlobalErrorMapper.NOT_AUTHORIZED.status)
      .send(GlobalErrorMapper.NOT_AUTHORIZED.userMessage)
  }
}

export default middleware
