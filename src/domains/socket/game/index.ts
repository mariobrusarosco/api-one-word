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

  // watchGameUpdate(socket: any) {
  //   socket.on(SocketEvents.GAME_UPDATE, (gameState: IGameState) => {
  //     socket.broadcast.emit(SocketEvents.GAME_UPDATE, gameState);
  //   });
  // }

  // watchGamePhaseUpdate(socket: any) {
  //   socket.on(SocketEvents.GAME_PHASES_UPDATE, ({ phases }: { phases: IGamePhase[] }) => {
  //     // Broadcast to all clients in the room
  //     socket.broadcast.emit(SocketEvents.GAME_PHASES_UPDATE, { phases });
  //   })
  // }
  
  // updateGamePhases(socket: any, phases: IGamePhase[]) {
  //   socket.broadcast.emit(SocketEvents.GAME_PHASES_UPDATE, { phases });
  // }

  // watchChosenWord(socket: any) {
  //   socket.on(SocketEvents.CHOSEN_WORD_UPDATE, ({ word }: { word: string }) => {
  //     socket.broadcast.emit(SocketEvents.CHOSEN_WORD_UPDATE, { word });
  //   });
  // }

  setupHandlers(socket: any) {
    this.leaveGameRoom(socket)
    this.joinGameRoom(socket)
    return this
  }
}