import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { NextFunction, Response, Request } from 'express'
import { AuthCookieContent, DemoMember } from '../typing/interfaces'
import { Utils } from '../utils'

const { NODE_ENV } = process.env

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const byPassAuth = NODE_ENV === 'demo'
    const authCookie = Utils.getUserCookie(req)

    if (byPassAuth) {
      const member = Utils.decodeMemberToken(authCookie) as AuthCookieContent

      req.authenticatedUser = {
        publicId: member.publicId || '',
        nickname: member.nickname
      }
    }

    next()
  } catch (error) {
    console.error('[AUTH MIDDLEWARE ERROR]', error)
    res
      .status(GlobalErrorMapper.NOT_AUTHORIZED.status)
      .send(GlobalErrorMapper.NOT_AUTHORIZED.userMessage)
  }
}
