import { SocketEvents } from '../typing/enums'
import { getSocketsFromRoom } from '../utils'

export class GameSocket {
  constructor(private socketServer: any) {
    this.socketServer = socketServer;
  }

  joinGameWaitingRoom(socket: any) {
    socket.on(SocketEvents.JOIN_GAME_WAITING_ROOM, async (gameId: string) => {
      socket.join(gameId)
      const users = await getSocketsFromRoom(this.socketServer, gameId)
      this.socketServer.in(gameId).emit(SocketEvents.UPDATE_GAME_PARTICIPANTS, users)
    })
  }

  leaveGameWaitingRoom(socket: any) {
    socket.on(SocketEvents.LEAVE_GAME_WAITING_ROOM, async (gameId: string) => {
      const allRoomUsers = await getSocketsFromRoom(this.socketServer, gameId)
      const remainingUsers = allRoomUsers.filter(
        (user: any) => user.userID !== socket.id
      )
      this.socketServer.in(gameId).emit(SocketEvents.UPDATE_GAME_PARTICIPANTS, remainingUsers)
      socket.leave(gameId)
    })
    
  }

  setupHandlers(socket: any) {
    this.joinGameWaitingRoom(socket)
    this.leaveGameWaitingRoom(socket)
    return this
  }
}