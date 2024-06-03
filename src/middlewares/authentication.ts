import { NextFunction, Request, Response } from 'express'
import { GlobalErrorMapper } from '../domains/shared/error-handling/mapper'
import { getUserCookie } from '../domains/shared/utils/getUserCookie'

const skipAuthWhenCreatingAnAccount = (req: Request) => {
  const { headers } = req
  const isAuthViaDemo = headers['x-auth-demo']

  console.log('[AUTH - POST]', headers)
  if (isAuthViaDemo) return true
  return false
}

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const fakeAuth = getUserCookie(req)
  console.log('[authentication] result', fakeAuth)

  if (skipAuthWhenCreatingAnAccount(req) || fakeAuth) {
    return next()
  }

  return res
    .status(GlobalErrorMapper.NOT_AUTHORIZED.status)
    .send(GlobalErrorMapper.NOT_AUTHORIZED.userMessage)
}

export default authentication
