import {  IGamePartipant, IGameState } from '@/domains/game/typing';
import { SocketEvents } from '../typing/enums'
import { getSocketsFromRoom, updateGameParticipants } from '../utils'

export class GameSocket {
  constructor(private socketServer: any) {
    this.socketServer = socketServer;
  }

  joinGame(socket: any) {
    socket.on(SocketEvents.JOIN_GAME, async ({ gameId }: {gameId: string }) => {
      // save the gameId to the socket
      socket.gameId = gameId
      
      console.log('[SOCKET]', socket.id, " has joined game ", gameId)
      await updateGameParticipants(this.socketServer, gameId)
      socket.join(gameId)
    })
  }

  leaveGame(socket: any) {
    socket.on(SocketEvents.LEAVE_GAME, async (gameId: string) => {
      socket.leave(gameId)

      console.log('[SOCKET]', socket.id, " has left game ", gameId)
      await updateGameParticipants(this.socketServer, gameId, socket.id)
    })
  }


  
  

  setupHandlers(socket: any) {
    this.joinGame(socket)
    this.leaveGame(socket)
    return this
  }
}