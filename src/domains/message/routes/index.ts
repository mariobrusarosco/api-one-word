import express from 'express'
import type { Express } from 'express'
import MessageController from '../controllers/message-controller'

const MessageRouting = (app: Express) => {
  const messageRouter = express.Router()

  messageRouter.get('/:channelId', MessageController.getChannelMessages)
  messageRouter.post('/:channelId', MessageController.createMessage)

  app.use(`${process.env.API_VERSION}/messages`, messageRouter)
}

export default MessageRouting
