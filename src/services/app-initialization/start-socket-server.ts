import type { IncomingMessage, Server, ServerResponse } from 'http'
import { Server as SocketServer } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import { CorsAllowedOrigins } from '../../domains/socket/constants'
import { SocketHandler } from '../../domains/socket/event-handler'

export const startSocketServer = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const socketServer = new SocketServer(server, {
    cors: {
      origin: CorsAllowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  instrument(socketServer, {
    auth: false,
    mode: 'development'
  })

  // Middlewares
  socketServer.use((socket: any, next) => {
    socket.username = socket.handshake.auth.username
    next()
  })

  const handler = SocketHandler(socketServer)

  socketServer.on('connection', async (socket: any) => {
    handler.joinTable(socket)
    handler.leaveTable(socket)
    handler.joinChat(socket)
    handler.leaveChat(socket)
    handler.chatMessage(socket)
    handler.disconnect(socket)
  })

  return socketServer
}
