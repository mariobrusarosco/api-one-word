import express from 'express'
import type { Express } from 'express'
import MessageController from '../controllers/message-controller'
import { AuthMiddleware } from '@/domains/auth/middleware'

// TODO Type the Request Handler
const MessageRouting = (app: Express) => {
  const messageRouter = express.Router()

  messageRouter.get('/:channelId', MessageController.getChannelMessages as any)
  messageRouter.post('/:channelId', MessageController.createMessage)

  app.use(`${process.env.API_VERSION}/messages`, AuthMiddleware, messageRouter)
}

export default MessageRouting
