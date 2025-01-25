import { TableSocket } from './table';
import { SocketEvents } from './typing/enums'
import { getSocketsFromRoom } from './utils'

export class SocketEventHandler {
  private socketServer: any;
  private tableSocket: TableSocket;

  constructor(socketServer: any) {
    this.socketServer = socketServer;
    this.tableSocket = new TableSocket(socketServer);
  }

  setupHandlers(socket: any) {
    this.tableSocket.setupHandlers(socket)
  }

  disconnect(socket: any) {
    socket.on('disconnect', () => {})
  }

  runAllHandlers(socket: any) {
    this.setupHandlers(socket)
    this.disconnect(socket)
  }
}
