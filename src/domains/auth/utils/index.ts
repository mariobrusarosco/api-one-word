import { Member } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { GlobalErrorMapper } from '@/domains/shared/error-handling/mapper'

const { JWT_SECRET, NODE_ENV: ENVIRONMENT, MEMBER_PUBLIC_ID_COOKIE } = process.env

interface CustomRequest extends Request {
  isPublic?: boolean
}

const decodeMemberToken = (token: string) => {
  return jwt.verify(token || '', JWT_SECRET || '')
}

const getUserCookie = (req: CustomRequest) =>
  req.cookies[MEMBER_PUBLIC_ID_COOKIE || ''] || null

const signUserCookieBased = (publicId: string, res: Response) => {
  if (!res || !publicId || !JWT_SECRET) return null

  const token = jwt.sign(publicId, JWT_SECRET, { expiresIn: '3d' })

  res.cookie(MEMBER_PUBLIC_ID_COOKIE || '', token, {
    httpOnly: true,
    secure: ENVIRONMENT === 'production'
  })

  return token
}

// const clearUserCookie = (res: Response) => {
//   res.clearCookie(MEMBER_PUBLIC_ID_COOKIE)
// }

export const Utils = {
  // clearUserCookie,
  getUserCookie,
  signUserCookieBased,
  decodeMemberToken
}

// const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
//   try {
//     console.log('------ AUTH MIDDLEWARE ------', req?.isPublic)

//     const authCookie = Utils.getAuthCookie(req)

//     // const authenticatedReq = req as AuthenticatedRequest
//     // authenticatedReq.authenticatedUser = decodedToken

//     next()
//   } catch (error) {
//     console.log('[AUTH MIDDLEWARE]', error)
//     return res
//       .status(GlobalErrorMapper.NOT_AUTHORIZED.status)
//       .send(GlobalErrorMapper.NOT_AUTHORIZED.userMessage)
//   }
// }
