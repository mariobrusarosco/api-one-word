import { GameSocket } from './game';
import { TableSocket } from './table';
import { SocketEvents } from './typing/enums';


export class SocketController {
  private tableSocket: TableSocket;
  private gameSocket: GameSocket;
  
  constructor(socketServer: any) {
    this.tableSocket = new TableSocket(socketServer);
    this.gameSocket = new GameSocket(socketServer);
  }

  private handleUserDisconnect(socket: any) {
    socket.on(SocketEvents.DISCONNECT, () => {
      console.log(`User disconnected: ${socket.data.user.username} (ID: ${socket.data.user.userID})`);
    });
  }

  setupHandlers(socket: any) {
    console.log(`User connected: ${socket.data.user.username} (ID: ${socket.data.user.userID})`);
    this.tableSocket.setupHandlers(socket);
    this.gameSocket.setupHandlers(socket);
    
    this.handleUserDisconnect(socket);
  }

  runAllHandlers(socket: any) {
    this.setupHandlers(socket);
  }
}
