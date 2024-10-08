import { Response } from 'express'
import { GlobalErrorMapper } from '../../shared/error-handling/mapper'
import { ErrorMapper } from '../error-handling/mapper'
import db from '../../../services/database'
import { Prisma } from '@prisma/client'
import { AppRequest } from '@/domains/shared/typing/express'
import { AuthenticatedRequest } from '@/domains/shared/typing/express'

async function createMessage(req: AuthenticatedRequest, res: Response) {
  const body = req?.body as Prisma.MessageCreateInput
  const params = req?.params as { channelId: string }
  const memberFullName = `${req.authenticatedUser?.firstName} ${req.authenticatedUser?.lastName}`

  if (!body.content) {
    return res.status(400).json({ message: ErrorMapper.MISSING_CONTENT })
  }

  if (!params.channelId) {
    return res.status(400).json({ message: ErrorMapper.MISSING_CHANNEL_ID })
  }

  try {
    const newMessage = await db.message.create({
      data: {
        content: body.content,
        channelId: params.channelId,
        memberId: req.authenticatedUser.id,
        memberFullName: memberFullName
      }
    })

    return res.json(newMessage)
  } catch (error) {
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

async function getChannelMessages(req: AppRequest, res: Response) {
  try {
    const searchParams = new URLSearchParams(req.query)
    const params = req?.params as { channelId: string }

    let messages = null
    const cursor = searchParams.get('cursor')
    const take = Number(searchParams.get('take')) || 6

    if (cursor === '0') {
      messages = await db.message.findMany({
        where: { channelId: params.channelId },
        take: -take,
        orderBy: { createdAt: 'asc' }
        // include: { member: { select: { firstName: true } } }
      })
    } else {
      messages = await db.message.findMany({
        where: { channelId: params.channelId },
        take: -take,
        skip: 1,
        cursor: {
          id: cursor as string
        },
        orderBy: { createdAt: 'asc' }
        // include: { member: { select: { firstName: true } } }
      })
    }

    const lastPostInResults = messages[0]
    const lastCursor = messages.length === take ? lastPostInResults?.id : null

    return res.json({ messages, lastCursor })
  } catch (error) {
    console.log({ error })
    return res
      .status(GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
      .send(GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)
  }
}

const MessageController = {
  createMessage,
  getChannelMessages
}

export default MessageController
