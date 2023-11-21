import express from 'express'
import type { Express } from 'express'
import ChannelController from '../controllers/channel-controller'

const TournamentRouting = (app: Express) => {
  const channelRouter = express.Router()

  channelRouter.post('/', ChannelController.createChannel)
  channelRouter.delete('/:channelId', ChannelController.deleteChannel)

  app.use(`${process.env.API_VERSION}/channels`, channelRouter)
}

export default TournamentRouting
