import { Request } from 'express'

export const getUserCookie = (req: Request) => {
  const cookies = req.cookies
  const appCookie = cookies['one_word_auth']

  return appCookie
}
