# Participant Exit Notification System

## Overview

This document describes how the One Word API notifies game participants when another participant exits a game, either by explicitly leaving or disconnecting.

## Implementation

The system uses Socket.IO to provide real-time notifications to all participants in a game when someone leaves. This happens in two scenarios:

1. **Explicit Exit**: When a user intentionally leaves a game (e.g., clicks a "Leave Game" button)
2. **Disconnection**: When a user disconnects from the Socket.IO server (e.g., closes the browser)

## Events

### Client-side Events (to listen for)

- `game-participant-exit`: Emitted when a participant leaves a game
  - Payload:
    ```typescript
    {
      user: {
        userID: string;
        username: string;
      },
      message: string; // e.g., "Username has left the game"
      timestamp: string; // ISO date string
    }
    ```

- `update-game-room-participants`: Emitted after a participant exits to provide the updated list of participants
  - Payload: Array of user objects
    ```typescript
    [
      {
        userID: string;
        username: string;
      },
      // ...more participants
    ]
    ```

### Client-side Events (to emit)

- `leave-game-room`: To explicitly leave a game room
  - Payload: `gameId` (string)

## Frontend Implementation Example

```typescript
// Example of how to use these events in the frontend
socket.on('game-participant-exit', (data) => {
  console.log(`${data.user.username} has left the game`);
  // Show a notification to the user
  showNotification(data.message);
  
  // You could also play a sound, update UI, etc.
});

socket.on('update-game-room-participants', (participants) => {
  // Update the list of participants in the UI
  updateParticipantsList(participants);
});

// To leave a game
function leaveGame(gameId) {
  socket.emit('leave-game-room', gameId);
  // Navigate away from the game page or update UI as needed
}
```

## Server-side Implementation

The server handles participant exits by:

1. Detecting when a user leaves a game room (either explicitly or by disconnection)
2. Getting the updated list of participants
3. Notifying all remaining participants with the participant-exit event
4. Updating the participant list for all remaining users

This provides a seamless experience where all participants are immediately aware when someone leaves the game. 