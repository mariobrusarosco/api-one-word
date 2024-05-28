import type { IncomingMessage, Server, ServerResponse } from 'http'
import websocket from 'ws'
import { Server as SocketServer } from 'socket.io'
import { Socket } from 'socket.io'
import { SocketEvents } from '../../domains/socket/typing/enums'
import { Namespace } from '../../domains/socket/Namespace'
import { join } from 'path'
import { instrument } from '@socket.io/admin-ui'
import { ClientSocketEvents } from './client-sockets-events'

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
        'https://one-word-game.netlify.app',
        'https://one-word.mariobrusarosco.com'
      ],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
  instrument(socketServer, { auth: false, mode: 'development' })
  const connections = new Set()

  // Middleware
  socketServer.use((socket: any, next) => {
    socket.username = socket.handshake.auth.username
    // console.log('middle', socket.handshake.auth)
    next()
  })

  socketServer.on('connection', async (socket: GameSocket) => {
    connections.add(socket)
    const users = new Set() as any

    socketServer.of('/').sockets.forEach((value: any, key: string) => {
      users.add({
        userID: key,
        username: value.username
      })
    })

    // const gameRoomId = socket.handshake.auth.tableId
    // await socket.join(gameRoomId)
    // console.log({ users, socket })

    // console.log(
    //   'user:',
    //   socket.id,
    //   ' to play game: ',
    //   socket.handshake.auth.tableId,
    //   ' with users: ',
    //   socketServer.sockets.adapter.rooms.get(socket.handshake.auth.tableId),
    // )

    // socketServer
    //   .to(gameRoomId)
    //   .emit(
    //     'update_list_of_users',
    //     mapToRoomUsers(
    //       socketServer.sockets.adapter.rooms.get(socket.handshake.auth.tableId),
    //       users
    //     )
    //   )

    socket.on('chat-message', (data: any) => {
      // socketServer.to(gameRoomId).emit('chat-message', data.toString())
    })

    socket.on(ClientSocketEvents.JOIN_TABLE, (tableId: string) => {
      socket.join(tableId)
      console.log('joined table:', tableId)
    })

    socket.on(ClientSocketEvents.LEAVE_TABLE, (tableId: string) => {
      socket.leave(tableId)
      console.log('left table:', tableId)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    // console.log(socketServer.sockets.adapter.rooms)

    const count2 = socketServer.of('/').sockets.size

    console.log('count:', count2)
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
