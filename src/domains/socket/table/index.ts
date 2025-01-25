import { SocketEvents } from '../typing/enums'
import { getSocketsFromRoom } from '../utils'

export class TableSocket {
  constructor(private socketServer: any) {
    this.socketServer = socketServer;
  }


  joinTable(socket: any) {
    socket.on(SocketEvents.JOIN_TABLE, async (tableId: string) => {
      socket.join(tableId)
      const users = await getSocketsFromRoom(this.socketServer, tableId)
      this.socketServer.in(tableId).emit(SocketEvents.UPDATE_TABLE_PARTICIPANTS, users)
    })
  }

  leaveTable(socket: any) {
    socket.on(SocketEvents.LEAVE_TABLE, async (tableId: string) => {
      const allRoomUsers = await getSocketsFromRoom(this.socketServer, tableId)
      const remainingUsers = allRoomUsers.filter(
        (user: any) => user.userID !== socket.id
      )
      this.socketServer.in(tableId).emit(SocketEvents.UPDATE_TABLE_PARTICIPANTS, remainingUsers)
      socket.leave(tableId)
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
    console.log("[chatMessage]")
    socket.on(
      SocketEvents.NEW_CHAT_MESSAGE,
      ({ message, channelId }: { channelId: string; message: string }) => {
        console.log("[---------------------]", {message, channelId})
        this.socketServer.to(channelId).emit(SocketEvents.UPDATE_CHAT_MESSAGES, message)
      }
    )
  }

  setupHandlers(socket: any) {
    this.joinTable(socket)
    this.leaveTable(socket)
    this.joinChat(socket)
    this.leaveChat(socket)
    this.chatMessage(socket)
  }
}
