import { Member } from '@prisma/client'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const getAuthCookie = (req: Request) => req.cookies['one_word_auth'] || null

const signUserCookieBased = (user: Member, res: Response) => {
  const secret = process.env.JWT_SECRET

  if (!res || !user || !secret) return null

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      email: user.email
    },
    secret,
    {
      expiresIn: '1d'
    }
  )

  res.cookie('one_word_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })

  return token
}

export const Auth = {
  getAuthCookie,
  signUserCookieBased
}
