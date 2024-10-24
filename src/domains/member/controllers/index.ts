import { Request, RequestHandler, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import Logger from '../../../services/profiling'
import { v4 } from 'uuid'
import { Utils } from '@/domains/auth/utils'
import { IAuthUser } from '@/domains/auth/typing/interfaces'
import { AuthController } from '@/domains/auth/controllers'

const getMember = async (req: Request, res: Response) => {
  try {
    const authCookie = Utils.getUserCookie(req)
    const authServiceId = Utils.decodeMemberToken(authCookie) as { id: string }

    Logger.log(`[DEBUG] getMember ${authServiceId} `)

    const member = await db.member.findUnique({
      where: { authServiceId: authServiceId.id }
    })

    if (!member) {
      return res
        .status(ErrorMapper.NOT_FOUND.status)
        .send(ErrorMapper.NOT_FOUND.userMessage)
    }

    // TODO
    // const token = Utils.signUserCookieBased(res)

    // if (!token) {
    //   console.log('TOKEN ISSUE')
    //   return res
    //     .status(ErrorMapper.TOKEN_FAILURE.status)
    //     .send(ErrorMapper.TOKEN_FAILURE.userMessage)
    // }

    return res.status(200).send('EITA')
  } catch (error: any) {
    console.error(`[AUTH - GET] ${error}`)
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const createMember = async (req: Request, res: Response) => {
  try {
    const body = req?.body as IAuthUser

    Logger.log(`[DEBUG] createUser ${body}`)

    await db.member.create({
      data: {
        email: body.email,
        nickname: body.name || body.nickname || '',
        authServiceId: body.sub
      }
    })

    return AuthController.authenticateUser(req, res)
  } catch (error: any) {
    Logger.error(`[AUTH - POST] ${error}`)

    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const MemberController = {
  getMember,
  createMember
}

export default MemberController
