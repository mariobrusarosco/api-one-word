import { Request, RequestHandler, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import { Utils } from '@/domains/auth/utils'

const authenticateUser: RequestHandler = async function (req: Request, res: Response) {
  try {
    const query = req?.query
    const publicId = query.publicId as string

    const member = await db.member.findUnique({
      where: { publicId }
    })

    if (!member) {
      res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.userMessage)

      return
    }

    const token = Utils.signUserCookieBased(
      {
        nickname: member.nickname,
        publicId
      },
      res
    )

    res.status(200).send(token)
  } catch (error: any) {
    console.error(`[AUTH - GET] ${error}`)

    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function unauthenticateUser(req: Request, res: Response) {
  try {
    const token = Utils.signUserCookieBased(
      {
        nickname: 'test',
        publicId: 'test'
      },
      res
    )

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
