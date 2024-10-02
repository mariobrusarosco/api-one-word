import { Request, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import Logger from '../../../services/profiling'
import { v4 } from 'uuid'
import { AuthenticatedRequest } from '@/domains/shared/typing/express'
import { Utils } from '@/domains/auth/utils'
import { getAuthCookie } from '../middleware'
import { IAuthUser } from '../typing/interfaces'

async function authenticateUser(req: AuthenticatedRequest, res: Response) {
  try {
    const body = req?.body as IAuthUser
    const publicId = body.sub
    const token = Utils.signUserCookieBased(publicId, res)

    return res.status(200).send(token)
  } catch (error: any) {
    console.error(`[AUTH - POST] ${error}`)

    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function unauthenticateUser(req: AuthenticatedRequest, res: Response) {
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

// async function getAuthenticatedUserOld(req: AuthenticatedRequest, res: Response) {
//   try {
//     const user = req.authenticatedUser
//     console.log('[DEBUG] getAuthenticatedUser', user)

//     const result = await db.member.findUnique({
//       where: { id: user?.id }
//     })

//     if (!result) {
//       return res
//         .status(ErrorMapper.NOT_FOUND.status)
//         .send(ErrorMapper.NOT_FOUND.userMessage)
//     }

//     return res.status(200).send(result)
//   } catch (error: any) {
//     Logger.error(`[AUTH - GET] ${error}`)
//     res
//       .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
//       .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
//   }
// }

// async function getAuthenticatedUser(req: AuthenticatedRequest, res: Response) {
//   try {
//     const providerId = req.query.providerId as string
//     console.log('[DEBUG] getAuthenticatedUser', providerId)

//     const member = await db.member.findUnique({
//       where: { authServiceId: providerId }
//     })

//     if (!member) {
//       return res
//         .status(ErrorMapper.NOT_FOUND.status)
//         .send(ErrorMapper.NOT_FOUND.userMessage)
//     }

//     const token = Utils.signUserCookieBased(member, res)

//     if (!token) {
//       console.log('TOKEN ISSUE')
//       return res
//         .status(ErrorMapper.TOKEN_FAILURE.status)
//         .send(ErrorMapper.TOKEN_FAILURE.userMessage)
//     }

//     return res.status(200).send(member)
//   } catch (error: any) {
//     console.error(`[AUTH - GET] ${error}`)
//     res
//       .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
//       .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
//   }
// }

export const AuthController = {
  authenticateUser
  // getAuthenticatedUser,
  // getAuthenticatedUserOld,
  // authenticateUserOld
}
