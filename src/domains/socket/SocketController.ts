import { GameSocket } from './game';
import { TableSocket } from './table';
import { SocketEvents } from './typing/enums';
import { ISocketUser } from './typing/socket';

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
    this.tableSocket.setupHandlers(socket);
    this.gameSocket.setupHandlers(socket);
  }


  runAllHandlers(socket: any) {
    this.setupHandlers(socket);
  }
}
