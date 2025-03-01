import { Socket } from 'socket.io';
import { ISocketUser } from './typing/socket';

/**
 * Middleware to authenticate socket connections
 * Extracts user information from the handshake auth data
 */
export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const { username, email, userId } = socket.handshake.auth;

    // Use username as a minimum requirement but provide fallback
    // This ensures we don't block connections without username
    const socketUsername = username || `guest-${Math.random().toString(36).substring(2, 7)}`;

    // Create a user object to attach to the socket
    const user: ISocketUser = {
      userID: userId || `guest-${Math.random().toString(36).substring(2, 9)}`,
      username: socketUsername
    };

    // Attach user info to socket instance
    (socket as any).user = user;
    
    // For backward compatibility - keep the original username property
    (socket as any).username = socketUsername;
    
    // For better Admin UI identification, set a custom property
    // that will be displayed in the Socket.IO Admin UI
    socket.data.userIdentifier = email ? `${socketUsername} (${email})` : socketUsername;

    next();
  } catch (error) {
    console.error('Socket authentication error:', error);
    // Don't block the connection on error, just log it
    // and set default values
    (socket as any).username = `guest-${Math.random().toString(36).substring(2, 7)}`;
    next();
  }
}; 