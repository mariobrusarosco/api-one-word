import { GameSocket } from './game';
import { TableSocket } from './table';
import { SocketEvents } from './typing/enums';
import { Server, Socket } from 'socket.io';
import { ISocketUser } from './typing/socket';

export class SocketController {
  private tableSocket: TableSocket;
  private gameSocket: GameSocket;
  
  constructor(socketServer: Server) {
    this.tableSocket = new TableSocket(socketServer);
    this.gameSocket = new GameSocket(socketServer);
  }

  private handleUserDisconnect(socket: ISocketUser) {
    socket.on(SocketEvents.DISCONNECT, () => {
      console.log(`User disconnected: ${socket.data.user.username} (ID: ${socket.data.user.id})`);
    });
  }

  setupHandlers(socket: ISocketUser) {
    console.log(`User connected: ${socket.data.user.username} (ID: ${socket.data.user.id})`);
    this.tableSocket.setupHandlers(socket);
    this.gameSocket.setupHandlers(socket);
    
    this.handleUserDisconnect(socket);
  }

  runAllHandlers(socket: Socket) {
    this.setupHandlers(socket);
  }
}
