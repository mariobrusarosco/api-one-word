import { Request, Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import { Prisma } from '@prisma/client'

async function getChannelById(req: Request, res: Response) {
  const channeld = req?.params.channelId

  console.log('channeld', channeld)

  if (!channeld) {
    return res
      .status(ErrorMapper.MISSING_CHANNEL_ID.status)
      .json(ErrorMapper.MISSING_CHANNEL_ID)
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
      return res
        .status(ErrorMapper.NOT_FOUND.status)
        .send(ErrorMapper.NOT_FOUND.userMessage)
    }

    return res.json(channel)
  } catch (error) {
    console.log('error', error)
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

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
  const channeld = req?.params.channelId

  if (!channeld) {
    return res
      .status(ErrorMapper.MISSING_CHANNEL_ID.status)
      .json(ErrorMapper.MISSING_CHANNEL_ID)
  }

  try {
    const existingChannel = await db.channel.findUnique({
      where: {
        id: channeld
      }
    })

    if (!existingChannel) {
      return res
        .status(ErrorMapper.NOT_FOUND.status)
        .send(ErrorMapper.NOT_FOUND.userMessage)
    }

    await db.channel.delete({
      where: {
        id: channeld
      }
    })

    return res.json('ok')
  } catch (error) {
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function updateChannel(req: Request, res: Response) {
  const channeld = req?.params.channelId
  if (!channeld) {
    return res
      .status(ErrorMapper.MISSING_CHANNEL_ID.status)
      .json(ErrorMapper.MISSING_CHANNEL_ID.userMessage)
  }

  const { tableId, name } = req?.body as Prisma.ChannelUpdateInput & { tableId: string }

  if (!tableId) {
    return res
      .status(ErrorMapper.MISSING_TABLE_ID.status)
      .json(ErrorMapper.MISSING_TABLE_ID.userMessage)
  }

  try {
    const result = await db.channel.update({
      where: { id: channeld },
      data: { name: name }
    })

    return res.json(result)
  } catch (error) {
    return res
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
