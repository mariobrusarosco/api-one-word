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
    // Get username from either the user object or direct username property
    const username = socket.user?.username || socket.username || 'Unknown User';
    const userId = socket.user?.userID || 'Unknown ID';
    
    // Log user connection with available information
    console.log(`User connected: ${username} (ID: ${userId})`);
    
    this.tableSocket.setupHandlers(socket);
    this.gameSocket.setupHandlers(socket);
    
    // Setup disconnect handler
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${username}`);
    });
  }

  runAllHandlers(socket: any) {
    this.setupHandlers(socket);
  }
}
