import { Request, RequestHandler, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import Logger from '../../../services/profiling'
import { IAuthUser } from '@/domains/auth/typing/interfaces'

const getMember: RequestHandler = async function (req: Request, res: Response) {
  try {
    const { publicId } = req.authenticatedUser
    Logger.log(`[DEBUG] getMember`, publicId)

    const member = await db.member.findUnique({
      where: { publicId }
    })

    if (!member) {
      res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.userMessage)

      return
    }

    res.status(200).send(member)
  } catch (error: any) {
    console.error(`[AUTH - GET] ${error}`)

    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const createMember: RequestHandler = async function (req: Request, res: Response) {
  try {
    const body = req?.body as IAuthUser

    Logger.log(`[DEBUG] createUser ${body}`)

    const member = await db.member.create({
      data: {
        email: body.email,
        nickname: body.name || body.nickname || '',
        publicId: body.sub
      }
    })

    res.status(200).send(member)
  } catch (error: any) {
    Logger.error(`[AUTH - POST] ${error}`)

    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const MemberController = {
  getMember,
  createMember
}

export default MemberController
