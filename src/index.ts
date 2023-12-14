import express from 'express'
import cookieParser from 'cookie-parser'
import websocket from 'ws'
import TableRouting from './domains/table/routes'
import ChannelRouting from './domains/channel/routes'
import MessageRouting from './domains/message/routes'

import logger from './middlewares/logger'
import authentication from './middlewares/authentication'
import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'

const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0
})

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())
// app.set('trust proxy', 1)
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

const corsConfig = {
  origin: true,
  credentials: true
}
app.use(cors(corsConfig))
// app.options('*', cors(corsConfig))

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', process.env.ACESS_CONTROL_ALLOW_ORIGIN)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin'
//   )
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')

//   next()
// })

app.use(cookieParser() as any)
app.use(express.json())
app.use(logger)

TableRouting(app)
ChannelRouting(app)
MessageRouting(app)
// UserRouting(app)
// AuthRouting(app)

app.use('/socket', (req, res) => {
  console.log('trying socket')

  res.send('socket')
})
app.use(Sentry.Handlers.errorHandler())

// Optional fallthrough error handler
// app.use(function onError(err, req, res: any) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500
//   res.end(res.sentry + '\n')
// })

async function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  })
  const socketServer = new websocket.Server({
    server
  })

  socketServer.on('connection', socket => {
    console.log('connected')
  })
}

startServer()

export default app

// Middleware flow POC!
// app.use(middleware1)
// app.use(middleware2)
// app.get('/middlewares', (_, res) => {
//   console.log('GET on /middlewares')
//   res.send('middlewares')
// })
// Middleware flow POC!
