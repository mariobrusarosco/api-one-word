import express from 'express'
import type { Express } from 'express'
import ChannelController from '../controllers/channel-controller'
import { AuthMiddleware } from '@/domains/auth/middleware'

const TournamentRouting = (app: Express) => {
  const channelRouter = express.Router()

  channelRouter.post('/', ChannelController.createChannel)
  channelRouter.get('/:channelId', ChannelController.getChannelById)
  channelRouter.delete('/:channelId', ChannelController.deleteChannel)
  channelRouter.patch('/:channelId', ChannelController.updateChannel)

  app.use(`${process.env.API_VERSION}/channels`, AuthMiddleware, channelRouter)
}

export default TournamentRouting
