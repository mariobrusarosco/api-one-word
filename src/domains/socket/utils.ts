export const getSocketsFromRoom = async (socketServer: any, room: string) => {
  return (await socketServer.of('/').in(room).fetchSockets()).map((socket: any) => {
    return {
      userID: socket.id,
      username: socket.handshake.auth.username
    }
  })
} 