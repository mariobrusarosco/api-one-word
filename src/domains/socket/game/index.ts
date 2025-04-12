import {  IGamePartipant, IGameState } from '@/domains/game/typing';
import { SocketEvents } from '../typing/enums'
import { getSocketsFromRoom } from '../utils'

export class GameSocket {
  constructor(private socketServer: any) {
    this.socketServer = socketServer;
  }

  // Game Participant Exit
  watchForGameParticipantExit(socket: any) {
    socket.on(SocketEvents.GAME_PARTICIPANT_EXIT, (gameUser: IGamePartipant) => {
      this.emitParticipantExit(socket.room, gameUser)
      this.emitUpdateGameRoomParticipants(socket.room, socket)
    })
  }
  emitParticipantExit(roomId: string, socket: any) {
    const gameUser = {
      userID: socket.id,
      username: socket.handshake.auth.username
    }
    this.socketServer.in(roomId).emit(SocketEvents.GAME_PARTICIPANT_EXIT, gameUser)
  }

  // Game Participant Entrance
  watchForGameParticipantEntrance(socket: any) {
    socket.on(SocketEvents.GAME_PARTICIPANT_ENTRANCE, async (gameId: string) => {
      socket.join(gameId)
      const users = await getSocketsFromRoom(this.socketServer, gameId)
      
      this.emitParticipantEntrance(gameId, socket)
      this.emitUpdateGameRoomParticipants(gameId, users)
    })
  }
  emitParticipantEntrance(roomId: string, socket: any) {
    const gameUser = {
      userID: socket.id,
      username: socket.handshake.auth.username
    }
    this.socketServer.in(roomId).emit(SocketEvents.GAME_PARTICIPANT_ENTRANCE, gameUser)
  }

  // Game Participant Update    
  emitUpdateGameRoomParticipants(roomId: string, users: any[]) {
    this.socketServer.in(roomId).emit(SocketEvents.UPDATE_GAME_PARTICIPANTS, users)
  }
  // Game Update
  watchForGameUpdate(socket: any) {
    socket.on(SocketEvents.GAME_UPDATE, (gameState: IGameState) => {
      socket.broadcast.emit(SocketEvents.GAME_UPDATE, gameState);
    });
  }

  watchForGameDisconnections(socket: any) {
    socket.on('disconnect', async () => {
      const rooms = this.socketServer.sockets.adapter.rooms;
      const gameRooms = Array.from(rooms.keys()).filter((room) => {
        return typeof room === 'string' && room.includes('-game')
      });
      
      for (const roomId of gameRooms) {
        const remainingUsers = await getSocketsFromRoom(this.socketServer, roomId as string);
        this.emitUpdateGameRoomParticipants(roomId as string, remainingUsers)
        this.emitParticipantExit(roomId as string, socket.id)
      }
    });
  }

  setupHandlers(socket: any) {
    this.watchForGameParticipantExit(socket)
    this.watchForGameParticipantEntrance(socket)
    this.watchForGameUpdate(socket)
    this.watchForGameDisconnections(socket)
    return this
  }
}