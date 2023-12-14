import type { Express } from 'express'

const PORT = process.env.PORT || 3000

export const startWebServer = (app: Express) => {
  return app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  })
}
