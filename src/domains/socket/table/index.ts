import { SocketEvents } from '../typing/enums'
import {  updateTableParticipants } from '../utils'

export class TableSocket {
  constructor(private socketServer: any) {
    this.socketServer = socketServer;
  }

  onConnection(socket: any) {
    socket.on('disconnect', async () => {
      // If we have the tableId stored on the socket
      if (socket.tableId) {
        console.log("User disconnected from table:", socket.tableId);
        await updateTableParticipants(this.socketServer, socket.tableId, socket.id);
      }
    })
  }

  joinTable(socket: any) {
    socket.on(SocketEvents.JOIN_TABLE, async (tableId: string) => {
      // Save the current table to the socket
      socket.tableId = tableId;
      
      socket.join(tableId);
      await updateTableParticipants(this.socketServer, tableId);
    })
  }

  leaveTable(socket: any) {
    socket.on(SocketEvents.LEAVE_TABLE, async (tableId: string) => {
      await updateTableParticipants(this.socketServer, tableId, socket.id);
      socket.leave(tableId);
    })
  }

  joinChat(socket: any) {
    socket.on(SocketEvents.JOIN_CHAT, async (chatId: string) => {
      socket.join(chatId)
    })
  }

  leaveChat(socket: any) {
    socket.on(SocketEvents.LEAVE_CHAT, async (chatId: string) => {
      socket.leave(chatId)
    })
  }

  chatMessage(socket: any) {
    socket.on(
      SocketEvents.NEW_CHAT_MESSAGE,
      ({ message, channelId }: { channelId: string; message: string }) => {
        this.socketServer.to(channelId).emit(SocketEvents.UPDATE_CHAT_MESSAGES, message)
      }
    )
  }

  setupHandlers(socket: any) {
    this.onConnection(socket)
    this.joinTable(socket)
    this.leaveTable(socket)
    this.joinChat(socket)
    this.leaveChat(socket)
    this.chatMessage(socket)
  }
}
