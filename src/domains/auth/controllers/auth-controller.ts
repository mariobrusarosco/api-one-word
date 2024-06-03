import { Request, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import Logger from '../../../services/profiling'
import { getUserCookie } from '../../shared/utils/getUserCookie'
import { v4 } from 'uuid'

async function authenticateUser(req: Request, res: Response) {
  try {
    const body = req?.body as { demoId: string }
    const demoId = body?.demoId
    const authServiceId = `${demoId}-${v4()}`

    if (!!demoId) {
      const result = await db.member.create({
        data: {
          email: `${demoId.trim().toLowerCase()}@demo.com`,
          firstName: demoId.split(' ')[0] ?? 'demo',
          lastName: demoId.split(' ')[1] ?? '',
          authServiceId
        }
      })

      res.cookie('one_word_auth', result.id, {
        maxAge: 900000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      })

      return res.status(200).send('user created')
    }
  } catch (error: any) {
    Logger.error(`[AUTH - POST] ${error}`)

    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function getAuthenticatedUser(req: Request, res: Response) {
  try {
    const userIdOnCookie = getUserCookie(req)

    console.log({ userIdOnCookie })

    const result = await db.member.findUnique({
      where: { id: userIdOnCookie }
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
