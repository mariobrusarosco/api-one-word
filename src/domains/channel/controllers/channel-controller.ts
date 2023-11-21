import { Request, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'

import db from '../../../services/database'
import Match from '../../match/schema'
import { handleInternalServerErrorResponse } from '../../shared/error-handling/httpResponsesHelper'
import { Prisma } from '@prisma/client'
import { getUserCookie } from '../../../domains/shared/utils/getUserCookie'

// async function getTournamentMatches(req: Request, res: Response) {
//   const tournamentId = req?.params.tournamentId

//   try {
//     await Tournament.findOne(
//       { _id: tournamentId },
//       {
//         __v: 0
//       }
//     )

//     const allRelatedMatches = await Match.find({ tournamentId })

//     return res.status(200).send(allRelatedMatches)
//   } catch (error: any) {
//     if (error?.kind === 'ObjectId') {
//       return res
//         .status(ErrorMapper.NOT_FOUND.status)
//         .send(ErrorMapper.NOT_FOUND.userMessage)
//     } else {
//       console.error(error)
//       return res
//         .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
//         .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
//     }
//   }
// }

// async function getAllTournaments(req: Request, res: Response) {
//   try {
//     const allTournaments = await Tournament.find(
//       {},
//       {
//         __v: 0
//       }
//     )
//     return res.status(200).send(allTournaments)
//   } catch (error: any) {
//     if (error?.kind === 'ObjectId') {
//       return res
//         .status(ErrorMapper.NOT_FOUND.status)
//         .send(ErrorMapper.NOT_FOUND.userMessage)
//     } else {
//       console.error(error)
//       return res
//         .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
//         .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
//     }
//   }
// }

// async function getTournament(req: Request, res: Response) {
//   const tournamentId = req?.params.tournamentId

//   try {
//     const tournament = await Tournament.findOne(
//       { _id: tournamentId },
//       {
//         __v: 0
//       }
//     )

//     return res.status(200).send(tournament)
//   } catch (error: any) {
//     if (error?.kind === 'ObjectId') {
//       return res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.status)
//     } else {
//       return handleInternalServerErrorResponse(res, error)
//     }
//   }
// }

async function createChannel(req: Request, res: Response) {
  const body = req?.body as Prisma.ChannelCreateInput & { tableId: string }

  if (!body.name) {
    return res.status(400).json({ message: ErrorMapper.MISSING_NAME })
  }

  if (!body.tableId) {
    return res.status(400).json({ message: ErrorMapper.MISSING_TABLE_ID })
  }

  try {
    const existingChannel = await db.channel.findFirst({
      where: {
        name: body.name
      }
    })

    if (existingChannel) {
      return res
        .status(ErrorMapper.DUPLICATED_NAME.status)
        .send(ErrorMapper.DUPLICATED_NAME.userMessage)
    }

    const newChannel = await db.channel.create({
      data: {
        name: body.name,
        tableId: body.tableId
      }
    })

    return res.json(newChannel)
  } catch (error) {
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function deleteChannel(req: Request, res: Response) {
  const body = req?.body as Prisma.ChannelCreateInput & { tableId: string }

  if (!body.name) {
    return res.status(400).json({ message: ErrorMapper.MISSING_NAME })
  }

  if (!body.tableId) {
    return res.status(400).json({ message: ErrorMapper.MISSING_TABLE_ID })
  }

  try {
    const existingChannel = await db.channel.findFirst({
      where: {
        name: body.name
      }
    })

    if (existingChannel) {
      return res
        .status(ErrorMapper.DUPLICATED_NAME.status)
        .send(ErrorMapper.DUPLICATED_NAME.userMessage)
    }

    const newChannel = await db.channel.create({
      data: {
        name: body.name,
        tableId: body.tableId
      }
    })

    return res.json(newChannel)
  } catch (error) {
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const ChannelController = {
  createChannel,
  deleteChannel
}

export default ChannelController
