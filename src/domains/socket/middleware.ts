import { Socket } from 'socket.io';
import { ISocketUser } from './typing/socket';

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const { username, email, userId } = socket.handshake.auth;
    const user = {
      id: userId,
      username,
      email
    };
    
    socket.data.user = user;

    next();
  } catch (error) {
    console.error('Socket authentication error:', error);
    socket.data.user = {
      id: `guest-${Math.random().toString(36).substring(2, 7)}`,
      username: 'Guest',
      email: ''
    };
    next();
  }
}; 