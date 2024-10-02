import { NextFunction, Request, Response } from 'express'
import { GlobalErrorMapper } from '../domains/shared/error-handling/mapper'
import { Member } from '@prisma/client'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || ''

interface CustomRequest extends Request {
  isPublic?: boolean
}

const skipAuthWhenCreatingAnAccount = (req: Request) => {
  const { headers } = req
  const isAuthViaDemo = headers['x-auth-demo']

  return isAuthViaDemo ? true : false
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (skipAuthWhenCreatingAnAccount(req)) return next()

  try {
    console.log('------ AUTH MIDDLEWARE ------', req?.isPublic)

    // const authCookie = Auth.getAuthCookie(req)
    // const decodedToken = jwt.verify(authCookie, SECRET) as Member
    // const authenticatedReq = req as AuthenticatedRequest
    // authenticatedReq.authenticatedUser = decodedToken

    next()
  } catch (error) {
    console.log('[AUTH MIDDLEWARE]', error)
    return res
      .status(GlobalErrorMapper.NOT_AUTHORIZED.status)
      .send(GlobalErrorMapper.NOT_AUTHORIZED.userMessage)
  }
}

export default authMiddleware
