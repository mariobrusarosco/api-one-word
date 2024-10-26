import { Request, RequestHandler, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import { v4 as uuidV4 } from 'uuid'
import db from '../../../services/database'
import { Prisma, TableRole } from '@prisma/client'
import Logger from '../../../services/profiling'
import { Utils } from '@/domains/auth/utils'

const getAllTables: RequestHandler = async function (req: Request, res: Response) {
  try {
    const memberId = Utils.getAuthenticatedUserId(req, res)
    const results = await db.table.findMany({
      where: { seats: { some: { memberId } } },
      include: { seats: true, channels: true }
    })
    res.status(200).send(results)
  } catch (error) {
    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
    Logger.error(`[TABLES - GET] ${error}`)
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const createTable: RequestHandler = async function (req: Request, res: Response) {
  try {
    const memberId = Utils.getAuthenticatedUserId(req, res)
    const body = req?.body as Prisma.TableCreateInput

    if (!body?.name) {
      res.status(400).json({ message: 'You must provide a name to create a table' })
    }

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
          create: [
            {
              name: 'general'
            },
            {
              name: 'coffee break'
            }
          ]
        }
      }
    })

    res.json(newTable)
  } catch (error: any) {
    if (error?.value === 'NULL') {
      res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.status)
    } else {
      // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
      console.error(error)
      res
        .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
        .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.debug)
    }
  }
}

const getTable: RequestHandler = async function (req: Request, res: Response) {
  try {
    const tableId = req?.params.tableId
    const memberId = Utils.getAuthenticatedUserId(req, res)

    const tableSeat = await db.tableSeat.findFirst({
      where: { tableId, memberId }
    })

    if (!tableSeat) {
      res
        .status(ErrorMapper.MISSING_SEAT.status)
        .send(ErrorMapper.MISSING_SEAT.userMessage)

      return
    }

    const result = await db.table.findUnique({
      where: { id: tableId },
      include: { channels: true }
    })

    res.status(200).send(result)
  } catch (error: any) {
    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const updateTable: RequestHandler = async function (req: Request, res: Response) {
  try {
    const body = req?.body as Prisma.TableUpdateInput
    const tableNewName = body?.name

    if (!tableNewName) {
      res.status(400).json(ErrorMapper.MISSING_NAME)

      return
    }

    const tableId = req?.params.tableId

    const result = await db.table.update({
      where: { id: tableId },
      data: { name: tableNewName }
    })

    res.status(200).json(result)
  } catch (error) {
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const updateTableInvite: RequestHandler = async function (req: Request, res: Response) {
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

const joinTable: RequestHandler = async function (req: Request, res: Response) {
  try {
    const tableId = req?.params.tableId
    const body = req?.body as { email: string }
    const email = body?.email

    const userToJoin = await db.member.findFirst({ where: { email } })
    if (!userToJoin) {
      res.status(404).json(ErrorMapper.MEMBER_NOT_FOUND)
      return
    }

    const table = await db.table.update({
      where: { id: tableId },
      data: {
        seats: {
          create: {
            memberId: userToJoin.id,
            role: TableRole.GUEST
          }
        }
      }
    })

    res.status(200).json(table)
  } catch (error: any) {
    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
    console.error(error)
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.debug)
  }
}

const updateSeat: RequestHandler = async function (req: Request, res: Response) {
  try {
    const body = req?.body as Prisma.TableSeatUpdateInput
    const role = body?.role as TableRole
    const seatId = body?.id as string

    if (!role) {
      res.status(400).json(ErrorMapper.MISSING_SEAT_ROLE)
    }

    const updateSeat = await db.tableSeat.update({
      where: { id: seatId },
      data: { role }
    })

    res.status(200).json(updateSeat)
  } catch (error) {
    console.log(error)
    res
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
