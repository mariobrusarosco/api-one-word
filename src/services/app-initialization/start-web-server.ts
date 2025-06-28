import type { Express } from 'express'
import http from 'http'
const PORT = process.env.PORT || 3000

export const startWebServer = (app: Express) => {
  console.log('[WEB SERVER] Creating HTTP server...')
  const server = http.createServer(app)

  console.log('[WEB SERVER] Starting server on port:', PORT)
  return server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[WEB SERVER] Listening on port: ${PORT}`)
    console.log(`[WEB SERVER] Server address:`, server.address())
  })
}
