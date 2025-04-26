import { SocketEvents } from "./typing/enums";

export const getSocketsFromRoom = async (socketServer: any, room: string) => {
  return (await socketServer.of('/').in(room).fetchSockets()).map((socket: any) => {
    return {
      userID: socket.id,
      username: socket.handshake.auth.username
    }
  })
} 

/**
 * Updates table participants and notifies all users in the room
 * @param socketServer - The Socket.IO server instance
 * @param roomId - The room/table ID
 * @param socketToExclude - Optional socket ID to exclude from the list (e.g., for disconnected users)
 */
export const updateTableParticipants = async (
  socketServer: any,
  roomId: string,
  socketToExclude?: string
) => {
  const allRoomUsers = await getSocketsFromRoom(socketServer, roomId);
  const updatedUsers = socketToExclude 
    ? allRoomUsers.filter((user: any) => user.userID !== socketToExclude)
    : allRoomUsers;
    
  socketServer.in(roomId).emit(SocketEvents.UPDATE_TABLE_PARTICIPANTS, updatedUsers);
  
  return updatedUsers;
} 

export const updateGameParticipants = async (
  socketServer: any,
  roomId: string,
  socketToExclude?: string
) => {

  const allRoomUsers = await getSocketsFromRoom(socketServer, roomId);
  const updatedUsers = socketToExclude 
    ? allRoomUsers.filter((user: any) => user.userID !== socketToExclude)
    : allRoomUsers;
    
  socketServer.in(roomId).emit(SocketEvents.UPDATE_GAME_PARTICIPANTS, updatedUsers);
} 
  