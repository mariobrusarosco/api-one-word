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
  UPDATE_CHAT_MESSAGES = 'update-chat-messages',
  JOIN_GAME_WAITING_ROOM = 'join-game-waiting-room',
  LEAVE_GAME_WAITING_ROOM = 'leave-game-waiting-room',
  LEAVE_GAME = 'leave-game',
  GAME_STATUS = 'game-status',
  UPDATE_GAME_PARTICIPANTS = 'update-game-participants'
}
