import {  IGamePartipant, IGameState } from '@/domains/game/typing';
import { SocketEvents } from '../typing/enums'
import { getSocketsFromRoom, updateGameParticipants } from '../utils'
import { Server, Socket } from 'socket.io';
import { ISocketUser } from '../typing/socket';

export class GameSocket {
  constructor(private socketServer: Server) {
    this.socketServer = socketServer;
  }

  joinGame(socket: ISocketUser) {
    socket.on(SocketEvents.JOIN_GAME, async ({ gameId }: {gameId: string }) => {
      const user = socket.data.user;
      // save the gameId to the socket
      socket.data.gameId = gameId;
      
      console.log('[SOCKET]', user.username, " has joined game ", gameId);
      
      await updateGameParticipants(this.socketServer, gameId);
      socket.join(gameId);
      
      this.socketServer.to(gameId).emit(SocketEvents.JOIN_GAME, { gameId, user });
    })
  }

  leaveGame(socket: ISocketUser) {
    socket.on(SocketEvents.LEAVE_GAME, async (gameId: string) => {
      const user = socket.data.user;

      socket.leave(gameId);

      console.log('[SOCKET]', user.username, " has left game ", gameId);
      await updateGameParticipants(this.socketServer, gameId);
    })
  }

  setupHandlers(socket: ISocketUser) {
    this.joinGame(socket);
    this.leaveGame(socket);
    return this;
  }
}