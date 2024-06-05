import { SocketEvents } from './typing/enums'

const getSocketsFromRoom = async (socketServer: any, room: string) => {
  return (await socketServer.of('/').in(room).fetchSockets()).map((socket: any) => {
    return {
      userID: socket.id,
      username: socket.handshake.auth.username
    }
  })
}

export const SocketHandler = (socketServer: any) => {
  return {
    joinTable(socket: any) {
      socket.on(SocketEvents.JOIN_TABLE, async (tableId: string) => {
        socket.join(tableId)

        const users = await getSocketsFromRoom(socketServer, tableId)

        socketServer.in(tableId).emit(SocketEvents.UPDATE_TABLE_PARTICIPANTS, users)
      })
    },
    leaveTable(socket: any) {
      socket.on(SocketEvents.LEAVE_TABLE, async (tableId: string) => {
        const allRoomUsers = await getSocketsFromRoom(socketServer, tableId)
        const remainingUsers = allRoomUsers.filter(
          (user: any) => user.userID !== socket.id
        )

        socketServer
          .in(tableId)
          .emit(SocketEvents.UPDATE_TABLE_PARTICIPANTS, remainingUsers)

        socket.leave(tableId)
      })
    },
    joinChat(socket: any) {
      socket.on(SocketEvents.JOIN_CHAT, async (chatId: string) => {
        socket.join(chatId)
      })
    },
    leaveChat(socket: any) {
      socket.on(SocketEvents.LEAVE_CHAT, async (chatId: string) => {
        socket.leave(chatId)
      })
    },
    chatMessage(socket: any) {
      socket.on(
        SocketEvents.NEW_CHAT_MESSAGE,
        ({ message, channelId }: { channelId: string; message: string }) => {
          socketServer.to(channelId).emit(SocketEvents.UPDATE_CHAT_MESSAGES, message)
        }
      )
    },
    disconnect(socket: any) {
      socket.on('disconnect', () => {})
    }
  }
}
