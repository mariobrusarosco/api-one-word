import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_SECRET, NODE_ENV: ENVIRONMENT, MEMBER_PUBLIC_ID_COOKIE } = process.env

const decodeMemberToken = (token: string) => {
  return jwt.verify(token || '', JWT_SECRET || '')
}

const getUserCookie = (req: Request) => req.cookies[MEMBER_PUBLIC_ID_COOKIE || ''] || null

const signUserCookieBased = (publicId: string, res: Response) => {
  if (!res || !publicId || !JWT_SECRET) return null

  const token = jwt.sign(publicId, JWT_SECRET, { expiresIn: '3d' })

  res.cookie(MEMBER_PUBLIC_ID_COOKIE || '', token, {
    httpOnly: true,
    secure: ENVIRONMENT === 'production'
  })

  return token
}

const clearUserCookie = (res: Response) => {
  res.clearCookie(MEMBER_PUBLIC_ID_COOKIE || '')
}

const getUserIdFromRequest = (req: Request) => {
  return 'demo_id' in req?.authenticatedUser
    ? req.authenticatedUser.demo_id
    : req.authenticatedUser.id
}

export const Utils = {
  getUserIdFromRequest,
  clearUserCookie,
  getUserCookie,
  signUserCookieBased,
  decodeMemberToken
}
