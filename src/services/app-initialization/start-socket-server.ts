import type { IncomingMessage, Server, ServerResponse } from 'http'
import { Server as SocketServer } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import { CorsAllowedOrigins } from '../../domains/socket/constants'
import { SocketController } from '../../domains/socket/SocketController'
import { socketAuthMiddleware } from '../../domains/socket/middleware'

export const startSocketServer = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  // Create the Socket.IO server
  const io = new SocketServer(server, {
    cors: {
      origin: [...CorsAllowedOrigins, "https://admin.socket.io"],
      credentials: true
    }
  })

  // Setup Admin UI - using the official format
  instrument(io, {
    auth: false
  })

  // Apply the socket authentication middleware
  io.use(socketAuthMiddleware)

  const socketController = new SocketController(io)

  io.on('connection', async (socket: any) => {
    socketController.runAllHandlers(socket)
  })

  return io
}
