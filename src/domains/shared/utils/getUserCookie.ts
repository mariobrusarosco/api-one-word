import { Request } from 'express'

export const getUserCookie = (req: Request) => {
  const cookies = req.cookies
  const fakeAuth = cookies['one_word_auth'] || 'fa90c29e-6f30-4b0c-b086-8cfc9a04d229'

  return fakeAuth
}
