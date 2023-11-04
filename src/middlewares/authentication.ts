import { NextFunction, Request, Response } from 'express'
import { GlobalErrorMapper } from '../domains/shared/error-handling/mapper'
import { getUserCookie } from '../domains/shared/utils/getUserCookie'

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const fakeAuth = getUserCookie(req)

  if (fakeAuth) {
    return next()
  }

  const error = GlobalErrorMapper.NOT_AUTHORIZED
  return res.status(error.status).send(error.userMessage)
}

export default authentication
