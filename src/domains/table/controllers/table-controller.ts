import { Request, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import { v4 as uuidV4 } from 'uuid'

import db from '../../../services/database'
import { Prisma, TableRole } from '@prisma/client'
import { getUserCookie } from '../../../domains/shared/utils/getUserCookie'

async function getAllTables(_: Request, res: Response) {
  try {
    const results = await db.table.findMany({
      include: { profiles: { include: { member: true } }, channels: true }
    })
    return res.status(200).send(results)
  } catch (error) {
    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function createTable(req: Request, res: Response) {
  try {
    const body = req?.body as Prisma.TableCreateInput

    console.log(req.body)

    if (!body?.name) {
      return res
        .status(400)
        .json({ message: 'You must provide a name to create a table' })
    }

    const fakeAuth = getUserCookie(req)
    const newTable = await db.table.create({
      data: {
        name: body.name,
        inviteCode: uuidV4(),
        profiles: {
          create: {
            memberId: fakeAuth,
            role: TableRole.ADMIN
          }
        },
        channels: {
          create: {
            name: 'general'
          }
        }
      }
    })

    res.json(newTable)
  } catch (error: any) {
    if (error?.value === 'NULL') {
      return res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.status)
    } else {
      console.error(error)
      // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
      res
        .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
        .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.debug)
    }
  }
}

async function getTable(req: Request, res: Response) {
  const tableId = req?.params.tableId

  try {
    const result = await db.table.findUnique({
      where: { id: tableId }
    })

    return res.status(200).send(result)
  } catch (error: any) {
    if (error?.value === 'NULL') {
      return res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.status)
    } else {
      // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
      res
        .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
        .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
    }
  }
}

// async function updateLeague(req: Request, res: Response) {
//   const body = req?.body as ILeague
//   const leagueId = req?.params?.leagueId

//   if (!body.label) {
//     return res.status(400).json(ErrorMapper.MISSING_LABEL)
//   }

//   console.log({ body })

//   try {
//     const result = await League.findOneAndUpdate({ _id: leagueId }, body, {
//       returnDocument: 'after'
//     })

//     res.json(result)
//   } catch (error) {
//     console.error(error)
//     return res
//       .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
//       .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.user)
//   }
// }

const TableController = {
  getAllTables,
  getTable,
  createTable
}

export default TableController
