import { Socket } from 'socket.io'
import { SocketEvents } from './typing/enums'

export const SocketHandler = (socketServer: any) => {
  return {
    joinTable(socket: any) {
      socket.on(SocketEvents.JOIN_TABLE, (tableId: string) => {
        console.log('handler.... on  join-table', tableId)
        socket.join(tableId)
      })
    },
    leaveTable(socket: any) {
      socket.on(SocketEvents.LEAVE_TABLE, (tableId: string) => {
        console.log('handler.... on  leave-table', tableId)
        socket.leave(tableId)
      })
    },
    chatMessage(socket: any) {
      socket.on(SocketEvents.NEW_CHAT_MESSAGE, (tableId: string, message: string) =>
        socketServer.to(tableId).emit(SocketEvents.UPDATE_CHAT_MESSAGES, message)
      )
    },
    disconnect(socket: any) {
      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    },
    notifyAllUsersInRoom() {
      return async (room: any, user: any) => {
        const users = (await socketServer.of('/').in(room).fetchSockets()).map(
          (socket: any) => {
            return {
              userID: socket.id,
              username: socket.handshake.auth.username
            }
          }
        )

        socketServer.to(room).emit(SocketEvents.UPDATE_TABLE_PARTICIPANTS, users)
      }
    }
  }
}
