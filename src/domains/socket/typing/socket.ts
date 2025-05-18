import { Socket } from "socket.io";
 

export interface ISocketUser extends Socket {
  data: {
    user: {
      id: string;
      username: string;
      email: string;
    }
    gameId?: string;  
    tableId?: string;
  }
}

export interface ISocketRoom {
  name: string;
  users: ISocketUser[];
} 