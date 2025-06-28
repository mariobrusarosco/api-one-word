import type { IGame } from '@/domains/game/typing'
import { SocketEvents } from '../typing/enums'
import { updateGameParticipants } from '../utils'
import { Server, Socket } from 'socket.io'
import { ISocketUser } from '../typing/socket'

export class GameSocket {
  constructor(private socketServer: Server) {
    this.socketServer = socketServer
  }

  joinGame(socket: ISocketUser) {
    socket.on(SocketEvents.JOIN_GAME, async ({ gameId }: { gameId: string }) => {
      const user = socket.data.user
      // save the gameId to the socket
      socket.data.gameId = gameId
      socket.join(gameId)

      console.log('[SOCKET]', user.username, ' has joined game ', gameId)

      const allParticipants = await updateGameParticipants(this.socketServer, gameId)

      this.socketServer.to(gameId).emit(SocketEvents.JOIN_GAME, {
        gameId,
        joined: user,
        allParticipants
      })
    })
  }

  leaveGame(socket: ISocketUser) {
    socket.on(SocketEvents.LEAVE_GAME, async () => {
      const user = socket.data.user
      const gameId = socket.data.gameId as string

      console.log('[SOCKET]', user.username, ' has left game ', gameId)
      socket.leave(gameId)

      await updateGameParticipants(this.socketServer, gameId)

      this.socketServer.to(gameId).emit(SocketEvents.LEAVE_GAME, { gameId, user })
    })
  }

  updateGame(socket: ISocketUser) {
    socket.on(
      SocketEvents.GAME_UPDATE,
      async ({ gameId, game }: { gameId: string; game: IGame }) => {
        console.log('[DEBUG] [updateGame]', gameId, game)
        await updateGameParticipants(this.socketServer, gameId)
        this.socketServer.to(gameId).emit(SocketEvents.GAME_UPDATE, game)
      }
    )
  }

  setupHandlers(socket: ISocketUser) {
    this.joinGame(socket)
    this.leaveGame(socket)
    this.updateGame(socket)
    return this
  }
}
