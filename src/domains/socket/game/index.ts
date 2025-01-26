import {  IGameState } from '@/domains/game/typing';
import { SocketEvents } from '../typing/enums'
import { getSocketsFromRoom } from '../utils'

export class GameSocket {
  constructor(private socketServer: any) {
    this.socketServer = socketServer;
  }

  joinGameRoom(socket: any) {
    socket.on(SocketEvents.JOIN_GAME_ROOM, async (gameId: string) => {
      socket.join(gameId)
      const users = await getSocketsFromRoom(this.socketServer, gameId)
      this.socketServer.in(gameId).emit(SocketEvents.UPDATE_GAME_ROOM_PARTICIPANTS, users)
    })
  }

  leaveGameRoom(socket: any) {
    socket.on('disconnect', async () => {
      const rooms = this.socketServer.sockets.adapter.rooms;
      const gameRooms = Array.from(rooms.keys()).filter((room) => {
        return typeof room === 'string' && room.includes('-game')
      });
      
      for (const roomId of gameRooms) {
        const remainingUsers = await getSocketsFromRoom(this.socketServer, roomId as string);

        this.socketServer.in(roomId).emit(
          SocketEvents.UPDATE_GAME_ROOM_PARTICIPANTS, 
          remainingUsers
        );
      }
    });
  }

  watchGameUpdate(socket: any) {
    socket.on(SocketEvents.GAME_UPDATE, (gameState: IGameState) => {
      socket.broadcast.emit(SocketEvents.GAME_UPDATE, gameState);
    });
  }

  setupHandlers(socket: any) {
    this.leaveGameRoom(socket)
    this.joinGameRoom(socket)
    this.watchGameUpdate(socket)
    return this
  }
}