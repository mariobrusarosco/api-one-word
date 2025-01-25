import { GameSocket } from './game';
import { TableSocket } from './table';

export class SocketController {
  private socketServer: any;
  private tableSocket: TableSocket;
  private gameSocket: GameSocket;
  
  constructor(socketServer: any) {
    this.socketServer = socketServer;
    this.tableSocket = new TableSocket(socketServer);
    this.gameSocket = new GameSocket(socketServer);
  }

  setupHandlers(socket: any) {
    this.tableSocket.setupHandlers(socket)
    this.gameSocket.setupHandlers(socket)
  }

  disconnect(socket: any) {
    socket.on('disconnect', () => {})
  }

  runAllHandlers(socket: any) {
    this.setupHandlers(socket)
    this.disconnect(socket)
  }
}
