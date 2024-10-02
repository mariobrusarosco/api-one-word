import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { Member } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET
const ENVIRONMENT = process.env.NODE_ENV
const MEMBER_PUBLIC_ID_COOKIE = process.env.MEMBER_PUBLIC_ID_COOKIE || ''

interface CustomRequest extends Request {
  isPublic?: boolean
}

export const getAuthCookie = (req: CustomRequest) =>
  req.cookies[MEMBER_PUBLIC_ID_COOKIE] || null

const signUserCookieBased = (user: Member, res: Response) => {
  if (!res || !user || !SECRET) return null

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '3d' })

  res.cookie('one_word_auth', token, {
    httpOnly: true,
    secure: ENVIRONMENT === 'production'
  })

  return token
}

const requireAuthentication = (req: CustomRequest, res: Response, next: NextFunction) => {
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

export const Middleware = {
  getAuthCookie,
  signUserCookieBased,
  requireAuthentication
}
