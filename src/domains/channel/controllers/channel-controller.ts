import { Request, RequestHandler, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import { Prisma } from '@prisma/client'

const getChannelById: RequestHandler = async function (req: Request, res: Response) {
  const channeld = req?.params.channelId

  if (!channeld) {
    res.status(ErrorMapper.MISSING_CHANNEL_ID.status).json(ErrorMapper.MISSING_CHANNEL_ID)

    return
  }

  try {
    const channel = await db.channel.findUnique({
      where: {
        id: channeld
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
          // include: { member: { select: { firstName: true } } }
        }
      }
    })

    if (!channel) {
      res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.userMessage)
      return
    }

    res.json(channel)
  } catch (error) {
    console.log('error', error)
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const createChannel: RequestHandler = async function (req: Request, res: Response) {
  const body = req?.body as Prisma.ChannelCreateInput & { tableId: string }

  if (!body.name) {
    res.status(400).json({ message: ErrorMapper.MISSING_NAME })
    return
  }

  if (!body.tableId) {
    res.status(400).json({ message: ErrorMapper.MISSING_TABLE_ID })
    return
  }

  try {
    const existingChannel = await db.channel.findFirst({
      where: {
        name: body.name,
        tableId: body.tableId
      }
    })

    if (existingChannel) {
      res
        .status(ErrorMapper.DUPLICATED_NAME.status)
        .send(ErrorMapper.DUPLICATED_NAME.userMessage)
      return
    }

    const newChannel = await db.channel.create({
      data: {
        name: body.name,
        tableId: body.tableId
      }
    })

    res.json(newChannel)
  } catch (error) {
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const deleteChannel: RequestHandler = async function (req: Request, res: Response) {
  const channeld = req?.params.channelId

  if (!channeld) {
    res.status(ErrorMapper.MISSING_CHANNEL_ID.status).json(ErrorMapper.MISSING_CHANNEL_ID)
    return
  }

  try {
    const existingChannel = await db.channel.findUnique({
      where: {
        id: channeld
      }
    })

    if (!existingChannel) {
      res.status(ErrorMapper.NOT_FOUND.status).send(ErrorMapper.NOT_FOUND.userMessage)
      return
    }

    await db.channel.delete({
      where: {
        id: channeld
      }
    })

    res.json('ok')
  } catch (error) {
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const updateChannel: RequestHandler = async function (req: Request, res: Response) {
  try {
    const channeld = req?.params.channelId
    if (!channeld) {
      res
        .status(ErrorMapper.MISSING_CHANNEL_ID.status)
        .json(ErrorMapper.MISSING_CHANNEL_ID.userMessage)
      return
    }

    const { tableId, name } = req?.body as Prisma.ChannelUpdateInput & { tableId: string }

    if (!tableId) {
      res
        .status(ErrorMapper.MISSING_TABLE_ID.status)
        .json(ErrorMapper.MISSING_TABLE_ID.userMessage)

      return
    }

    const result = await db.channel.update({
      where: { id: channeld },
      data: { name: name }
    })

    res.json(result)
  } catch (error) {
    res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const ChannelController = {
  createChannel,
  deleteChannel,
  updateChannel,
  getChannelById
}

export default ChannelController
