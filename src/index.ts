// Disclaimer: Following Sentry DOCs, the above code should be placed in the main file before importing "Express" :https://docs.sentry.io/platforms/javascript/guides/express/
import './services/profiling/sentry-instrument'

const Sentry = require('@sentry/node')
import express from 'express'
import cookieParser from 'cookie-parser'
import TableRouting from './domains/table/routes'
import ChannelRouting from './domains/channel/routes'
import MessageRouting from './domains/message/routes'

import logger from './middlewares/logger'
import { startSocketServer } from './services/app-initialization/start-socket-server'
import { startWebServer } from './services/app-initialization/start-web-server'

// TODO Change to ESM import
const cors = require('cors')
const app = express()

const socketAdmin = express()
socketAdmin.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'))
socketAdmin.listen('5000')

const corsConfig = {
  // origin: true,
  origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  credentials: true
}
app.use(cors(corsConfig))
// app.options('*', cors(corsConfig))

console.log(process.env.ACCESS_CONTROL_ALLOW_ORIGIN)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')

  next()
})

app.use(cookieParser() as any)
app.use(express.json())
app.use(logger)

TableRouting(app)
ChannelRouting(app)
MessageRouting(app)
// UserRouting(app)
// AuthRouting(app)

Sentry.setupExpressErrorHandler(app)
// Optional fallthrough error handler
// app.use(function onError(err, req, res: any) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500
//   res.end(res.sentry + '\n')
// })

async function startServers() {
  const server = startWebServer(app)

  startSocketServer(server)
}

startServers()

export default app
