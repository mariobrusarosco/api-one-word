export enum ClientSocketEvents {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CREATE_GAME = 'create_game',
  LEAVE_TABLE = 'leave-table',
  JOIN_TABLE = 'join-table',
  JOIN_GAME_ROOM = 'join-game-room',
  MESSAGE = 'message',
  CHAT_MESSAGE = 'chat-message',
  CHAT_MESSAGE_INCOMING = 'chat-message-incoming',
  CHAT_MESSAGE_SENDING = 'chat-message-sending'
}
