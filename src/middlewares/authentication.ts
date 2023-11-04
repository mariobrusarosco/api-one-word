import { NextFunction, Request, Response } from 'express'
import { GlobalErrorMapper } from '../domains/shared/error-handling/mapper'

const authentication = (req: Request, res: Response, next: NextFunction) => {
  console.log('[logger]', req.url)
  console.log('[cookies]', req.cookies)
  const cookies = req.cookies
  const fakeAuth = cookies['one_word_auth']

  if (fakeAuth) {
    return next()
  }

  const error = GlobalErrorMapper.NOT_AUTHORIZED

  return res.status(error.status).send(error.userMessage)
}

export default authentication
