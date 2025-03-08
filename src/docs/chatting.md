# Chatting & Socket Debugging Guide

This Chat feature uses a Web Socket connection to establish a two-way-channel communication between Client and Server.

## Available Socket Monitoring Tools

### 1. Socket.IO Admin UI

#### Locally

The project includes the Socket.IO Admin UI for more advanced monitoring:

To access the admin UI:

1. Start the development server with `yarn dev`
2. Open `https://admin.socket.io/` in your browser
3. Connect to your local server: `http://localhost:3000`
4. Use the credentials:
   - Username: `admin`
   - Password: `admin`

From the admin UI, you can:

- Monitor active connections
- View and join rooms
- See events in real-time
- Inspect client details
- Emit events for testing

#### Non-Locally

TODO: Add instructions for non-locally

## Common Debugging Scenarios

### 1. Tracking User Connections

Monitor who's connected:

- Use the Socket.IO Admin UI to see all connections
- Check the "Clients" section to see connection details
- In the terminal logs, look for connection/disconnection events

### 2. Examining Room Membership

To see which users are in which rooms:

- In the Socket.IO Admin UI, go to the "Rooms" section
- Select a room to see all connected clients
- Use socket.rooms in your server-side code for debugging

## Chat Features

The chat functionality allows users to:

1. Join specific channels
2. Send and receive messages in real-time
3. See other online users
4. Receive notifications for user join/leave events

## Protocol

The socket communication protocol uses the following events:

### Client to Server

- `join_channel`: Join a specific chat channel
- `leave_channel`: Leave a chat channel
- `message`: Send a message to the current channel
- `typing`: Indicate the user is typing

### Server to Client

- `channel_joined`: Confirmation of joining a channel
- `channel_message`: New message in a channel
- `user_joined`: Notification when another user joins
- `user_left`: Notification when another user leaves
- `typing_status`: Broadcast when a user is typing
