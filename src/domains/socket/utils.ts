import { SocketEvents } from "./typing/enums";
import { ISocketUser } from "./typing/socket";

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
  socketToExclude?: ISocketUser["data"]
) => {
  const allRoomUsers = await getSocketsFromRoom(socketServer, roomId);
  const updatedUsers = socketToExclude 
    ? allRoomUsers.filter((user: any) => user.user.id !== socketToExclude.user.id)
    : allRoomUsers;
    
  socketServer.in(roomId).emit(SocketEvents.UPDATE_TABLE_PARTICIPANTS, updatedUsers);
  
  return updatedUsers;
} 

export const updateGameParticipants = async (
  socketServer: any,
  roomId: string,
  socketToExclude?: ISocketUser["data"]
) => {

  const allRoomUsers = await getSocketsFromRoom(socketServer, roomId);
  const updatedUsers = socketToExclude 
    ? allRoomUsers.filter((user: any) => user.user.id !== socketToExclude.user.id)
    : allRoomUsers;
    
  socketServer.in(roomId).emit(SocketEvents.UPDATE_GAME_PARTICIPANTS, updatedUsers);
} 
  