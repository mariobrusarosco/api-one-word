import { Socket } from 'socket.io';
import { ISocketUser } from './typing/socket';

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const { username, email, userId } = socket.handshake.auth;
    const user = {
      user: {
        id: userId,
        username,
        email
      }
    } satisfies ISocketUser["data"]
    
    socket.data.user = user

    next();
  } catch (error) {
    console.error('Socket authentication error:', error);
    (socket as any).username = `guest-${Math.random().toString(36).substring(2, 7)}`;
    next();
  }
}; 