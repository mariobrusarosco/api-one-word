export enum SocketEvents {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CREATE_GAME = 'create_game',
  LEAVE_TABLE = 'leave-table',
  JOIN_TABLE = 'join-table',
  UPDATE_TABLE_PARTICIPANTS = 'update-table-participants',
  JOIN_CHAT = 'join-chat',
  LEAVE_CHAT = 'leave-chat',
  MESSAGE = 'message',
  NEW_CHAT_MESSAGE = 'new-chat-message',
  UPDATE_CHAT_MESSAGES = 'update-chat-messages'
}
