import express from 'express'
import type { Express } from 'express'
import MessageController from '../controllers/message-controller'

// TODO Type the Request Handler
const MessageRouting = (app: Express) => {
  const messageRouter = express.Router()

  messageRouter.get('/:channelId', MessageController.getChannelMessages as any)
  messageRouter.post('/:channelId', MessageController.createMessage as any)

  app.use(`${process.env.API_VERSION}/messages`, messageRouter)
}

export default MessageRouting
