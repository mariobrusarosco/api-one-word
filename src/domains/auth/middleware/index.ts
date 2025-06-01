import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { NextFunction, Response, Request } from 'express'
import { AuthCookieContent } from '../typing/interfaces'
import { Utils } from '../utils'

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authCookie = Utils.getUserCookie(req)

    const member = Utils.decodeMemberToken(authCookie) as AuthCookieContent
    req.authenticatedUser = {
      publicId: member.publicId || '',
      nickname: member.nickname
    }

    next()
  } catch (error) {
    console.error('[AUTH MIDDLEWARE ERROR]', error)
    res
      .status(GlobalErrorMapper.NOT_AUTHORIZED.status)
      .send(GlobalErrorMapper.NOT_AUTHORIZED.userMessage)
  }
}
