import { Request, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import { v4 as uuidV4 } from 'uuid'
import db from '../../../services/database'
import { Prisma, TableRole } from '@prisma/client'
import Logger from '../../../services/profiling'
import { getUserCookie } from '@/domains/shared/utils/getUserCookie'

async function getAllTables(req: Request, res: Response) {
  try {
    const memberId = getUserCookie(req)
    const results = await db.table.findMany({
      where: { seats: { some: { memberId } } },
      include: { seats: true, channels: true }
    })
    return res.status(200).send(results)
  } catch (error) {
    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
    Logger.error(`[TABLES - GET] ${error}`)
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function createTable(req: Request, res: Response) {
  try {
    const body = req?.body as Prisma.TableCreateInput

    if (!body?.name) {
      return res
        .status(400)
        .json({ message: 'You must provide a name to create a table' })
    }

    const memberId = getUserCookie(req)
    const newTable = await db.table.create({
      data: {
        name: body.name,
        inviteCode: uuidV4(),
        seats: {
          create: {
            memberId,
            role: TableRole.ADMIN
          }
        },
        channels: {
          create: {
            name: 'General'
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
      where: { id: tableId },
      include: { channels: true }
    })

    return res.status(200).send(result)
  } catch (error: any) {
    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function updateTable(req: Request, res: Response) {
  try {
    const body = req?.body as Prisma.TableUpdateInput
    const tableNewName = body?.name

    if (!tableNewName) {
      return res.status(400).json(ErrorMapper.MISSING_NAME)
    }

    const tableId = req?.params.tableId

    const result = await db.table.update({
      where: { id: tableId },
      data: { name: tableNewName }
    })

    res.status(200).json(result)
  } catch (error) {
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function updateTableInvite(req: Request, res: Response) {
  try {
    const tableId = req?.params.tableId

    const table = await db.table.update({
      where: { id: tableId },
      data: { inviteCode: uuidV4() }
    })

    res.json(table.inviteCode)
  } catch (error: any) {
    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.debug)
  }
}

async function joinTable(req: Request, res: Response) {
  try {
    const inviteCode = req?.params.inviteCode

    const fakeAuth = getUserCookie(req)
    const table = await db.table.update({
      where: { inviteCode },
      data: {
        seats: {
          create: {
            memberId: fakeAuth,
            role: TableRole.GUEST
          }
        }
      }
    })

    res.json(table)
  } catch (error: any) {
    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
    console.error(error)
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.debug)
  }
}

async function updateSeat(req: Request, res: Response) {
  try {
    const body = req?.body as Prisma.TableSeatUpdateInput
    const role = body?.role as TableRole
    const seatId = body?.id as string

    if (!role) {
      return res.status(400).json(ErrorMapper.MISSING_PROFILE_ROLE)
    }

    const updateSeat = await db.tableSeat.update({
      where: { id: seatId },
      data: { role }
    })

    res.status(200).json(updateSeat)
  } catch (error) {
    console.log(error)
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const TableController = {
  getAllTables,
  getTable,
  createTable,
  updateTable,
  updateTableInvite,
  joinTable,
  updateSeat
}

export default TableController
