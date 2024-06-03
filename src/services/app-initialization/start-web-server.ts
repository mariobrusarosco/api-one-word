import type { Express } from 'express'
import http from 'http'
const PORT = process.env.PORT || 3000

export const startWebServer = (app: Express) => {
  const server = http.createServer(app)

  console.log(process.env)

  return server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  })
}
