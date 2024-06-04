import { Request, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import Logger from '../../../services/profiling'
import { Auth } from '../../shared/utils/auth'
import { v4 } from 'uuid'
import { AuthenticatedRequest } from '@/middlewares/authentication'

async function authenticateUser(req: AuthenticatedRequest, res: Response) {
  try {
    const body = req?.body as { demoId: string }
    const demoId = body?.demoId
    const authServiceId = `${demoId}-${v4()}`

    if (!!demoId) {
      const firstName = demoId.split(' ')[0] ?? 'demo'
      const lastName = demoId.split(' ')[1] ?? ''

      const user = await db.member.create({
        data: {
          email: `${firstName}.${lastName}@demo.com`.toLowerCase(),
          firstName,
          lastName,
          authServiceId
        }
      })

      const token = Auth.signUserCookieBased(user, res)
      if (!token) {
        return res
          .status(ErrorMapper.TOKEN_FAILURE.status)
          .send(ErrorMapper.TOKEN_FAILURE.userMessage)
      }

      return res.status(200).send(user)
    }
  } catch (error: any) {
    Logger.error(`[AUTH - POST] ${error}`)

    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function getAuthenticatedUser(req: AuthenticatedRequest, res: Response) {
  try {
    const user = req.authenticatedUser
    console.log('[DEBUG] getAuthenticatedUser', user)

    const result = await db.member.findUnique({
      where: { id: user?.id }
    })

    if (!result) {
      return res
        .status(ErrorMapper.NOT_FOUND.status)
        .send(ErrorMapper.NOT_FOUND.userMessage)
    }

    return res.status(200).send(result)
  } catch (error: any) {
    Logger.error(`[AUTH - GET] ${error}`)
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const AuthController = {
  authenticateUser,
  getAuthenticatedUser
}

export default AuthController
