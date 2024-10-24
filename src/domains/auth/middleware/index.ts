import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { NextFunction, Response, Request } from 'express'
import { DemoMember } from '../typing/interfaces'

const { NODE_ENV, DEMO_MEMBER_ID } = process.env

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const byPassAuth = NODE_ENV === 'demo'
    console.log('------ AUTH MIDDLEWARE ------', byPassAuth, DEMO_MEMBER_ID)

    if (byPassAuth) {
      req.authenticatedUser = { demo_id: DEMO_MEMBER_ID || '' } as DemoMember
    }
    // const authCookie = Utils.getAuthCookie(req)

    // const authenticatedReq = req as Request
    // authenticatedReq.authenticatedUser = decodedToken

    next()
  } catch (error) {
    console.log('[AUTH MIDDLEWARE]', error)
    res
      .status(GlobalErrorMapper.NOT_AUTHORIZED.status)
      .send(GlobalErrorMapper.NOT_AUTHORIZED.userMessage)
  }
}
