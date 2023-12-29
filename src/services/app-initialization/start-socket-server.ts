import type { IncomingMessage, Server, ServerResponse } from 'http'
import websocket from 'ws'
import { Server as SocketServer } from 'socket.io'
import type { Socket } from 'socket.io'
import { SocketEvents } from '../../domains/socket/typing/enums'
import { Namespace } from '../../domains/socket/Namespace'
import { join } from 'path'
import { instrument } from '@socket.io/admin-ui'

type GameSocket = Socket<any, any, { gameId: string }>

export const startSocketServer = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const socketServer = new SocketServer(server, {
    cors: {
      origin: [
        'http://localhost:5173',
        'https://admin.socket.io',
        'http://localhost:5000',
        'https://one-word-game.netlify.app'
      ],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
  instrument(socketServer, { auth: false, mode: 'development' })

  // Middleware
  socketServer.use((socket: any, next) => {
    socket.username = socket.handshake.auth.username
    // console.log('middle', socket.handshake.auth)
    next()
  })

  socketServer.on('connection', async (socket: GameSocket) => {
    const users = [] as any

    socketServer.of('/').sockets.forEach((value: any, key: string) => {
      users.push({
        userID: key,
        username: value.username
      })
    })

    console.log(
      'user:',
      socket.id,
      ' to play game: ',
      socket.handshake.auth.tableId,
      ' with users: ',
      socketServer.sockets.adapter.rooms.get(socket.handshake.auth.tableId),
      'all users',
      users
    )

    const gameRoomId = socket.handshake.auth.tableId

    await socket.join(gameRoomId)
    socketServer
      .to(gameRoomId)
      .emit(
        'update_list_of_users',
        mapToRoomUsers(
          socketServer.sockets.adapter.rooms.get(socket.handshake.auth.tableId),
          users
        )
      )

    socket.on('message', (data: any) => {
      socketServer.to(gameRoomId).emit('chat-message', data.toString())
    })
  })
  return socketServer
}

const mapToRoomUsers = (roomUsers: any, users: any) => {
  return [...roomUsers].map((socketId: any) => {
    return users.find(
      (user: { userID: string; username: string }) => user.userID === socketId
    )
  })
}
