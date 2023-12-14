import type { IncomingMessage, Server, ServerResponse } from 'http'
import websocket from 'ws'

export const startSocketServer = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const socketServer = new websocket.Server({
    server
  })

  socketServer.on('connection', socket => {
    socket.send('Connection established on server')

    socket.on('message', data => {
      console.log('message', data.toString())
    })
  })

  return socketServer
}
