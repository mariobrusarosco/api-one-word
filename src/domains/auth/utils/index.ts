import { GlobalErrorMapper } from '@/domains/shared/error-handling/mapper'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_SECRET, NODE_ENV: ENVIRONMENT, MEMBER_PUBLIC_ID_COOKIE } = process.env

const decodeMemberToken = (token: string) => {
  return jwt.verify(token || '', JWT_SECRET || '')
}

const getUserCookie = (req: Request) => req.cookies[MEMBER_PUBLIC_ID_COOKIE || ''] || null

const signUserCookieBased = (authId: string, res: Response) => {
  if (!res || !authId || !JWT_SECRET) return null

  const token = jwt.sign({ authId }, JWT_SECRET, { expiresIn: '1d' })

  res.cookie(MEMBER_PUBLIC_ID_COOKIE || '', token, {
    httpOnly: true,
    secure: ENVIRONMENT === 'production'
  })

  return token
}

const clearUserCookie = (res: Response) => {
  res.clearCookie(MEMBER_PUBLIC_ID_COOKIE || '')
}

const getAuthenticatedUserId = (req: Request, res: Response) => {
  try {
    return req.authenticatedUser.id
  } catch (e) {
    res
      .status(GlobalErrorMapper.NOT_AUTHORIZED.status)
      .send(GlobalErrorMapper.NOT_AUTHORIZED.userMessage)

    throw e
  }
}

export const Utils = {
  getAuthenticatedUserId,
  clearUserCookie,
  getUserCookie,
  signUserCookieBased,
  decodeMemberToken
}
