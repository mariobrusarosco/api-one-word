import { SocketEvents } from '../typing/enums'
import { updateTableParticipants } from '../utils'
import { Server, Socket } from 'socket.io';
import { ISocketUser } from '../typing/socket';

export class TableSocket {
  constructor(private socketServer: Server) {
    this.socketServer = socketServer;
  }

  onConnection(socket: ISocketUser) {
    socket.on('disconnect', async () => {
      // If we have the tableId stored on the socket
      if (socket.data.tableId) {
        console.log("User disconnected from table:", socket.data.tableId);
        await updateTableParticipants(this.socketServer, socket.data.tableId, { user: socket.data.user });
      }
    })
  }

  joinTable(socket: Socket) {
    socket.on(SocketEvents.JOIN_TABLE, async (tableId: string) => {
      // Save the current table to the socket
      socket.data.tableId = tableId;
      
      socket.join(tableId);
      await updateTableParticipants(this.socketServer, tableId);
    })
  }

  leaveTable(socket: Socket) {
    socket.on(SocketEvents.LEAVE_TABLE, async (tableId: string) => {
      await updateTableParticipants(this.socketServer, tableId, { user: socket.data.user });
      socket.leave(tableId);
    })
  }

  joinChat(socket: Socket) {
    socket.on(SocketEvents.JOIN_CHAT, async (chatId: string) => {
      socket.join(chatId)
    })
  }

  leaveChat(socket: Socket) {
    socket.on(SocketEvents.LEAVE_CHAT, async (chatId: string) => {
      socket.leave(chatId)
    })
  }

  chatMessage(socket: Socket) {
    socket.on(
      SocketEvents.NEW_CHAT_MESSAGE,
      ({ message, channelId }: { channelId: string; message: string }) => {
        this.socketServer.to(channelId).emit(SocketEvents.UPDATE_CHAT_MESSAGES, message)
      }
    )
  }

  setupHandlers(socket: Socket) {
    this.onConnection(socket)
    this.joinTable(socket)
    this.leaveTable(socket)
    this.joinChat(socket)
    this.leaveChat(socket)
    this.chatMessage(socket)
  }
}
