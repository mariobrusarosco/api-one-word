import { Request, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import Logger from '../../../services/profiling'
import { v4 } from 'uuid'
import { Utils } from '@/domains/auth/utils'
import { IAuthUser } from '../typing/interfaces'

async function authenticateUser(req: Request, res: Response) {
  try {
    const body = req?.body
    const authId = body.authId as string

    const member = await db.member.findUnique({
      where: { authServiceId: authId }
    })

    if (!member) {
      res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.userMessage)
      return
    }

    const token = Utils.signUserCookieBased(authId, res)

    res.status(200).send(token)
  } catch (error: any) {
    console.error(`[AUTH - POST] ${error}`)

    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function unauthenticateUser(req: Request, res: Response) {
  try {
    const token = Utils.signUserCookieBased('test', res)

    return res.status(200).send(token)
  } catch (error: any) {
    console.error(`[AUTH - POST] ${error}`)

    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}
export const AuthController = {
  authenticateUser
}
