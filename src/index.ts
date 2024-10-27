// Disclaimer: Following Sentry DOCs, the above code should be placed in the main file before importing "Express" :https://docs.sentry.io/platforms/javascript/guides/express/
import './services/profiling/sentry-instrument'
import 'dotenv/config'

const Sentry = require('@sentry/node')
import express from 'express'
import cookieParser from 'cookie-parser'
import TableRouting from '@/domains/table/routes'
import ChannelRouting from '@/domains/channel/routes'
import MessageRouting from '@/domains/message/routes'

import { startSocketServer } from '@/services/app-initialization/start-socket-server'
import { startWebServer } from '@/services/app-initialization/start-web-server'
import accessControl from '@/middlewares/access-control'
import AuthenticationRouting from '@/domains/auth/routes'
import MemberRouting from '@/domains/member/routes'
import Profiling from '@/services/profiling'

// TODO Change to ESM import
const cors = require('cors')
const app = express()

const socketAdmin = express()
socketAdmin.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'))
socketAdmin.listen('5000')

// Middlewares
app.use(
  cors({
    origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
    credentials: true
  })
)
app.use(accessControl)
app.use(cookieParser() as any)
app.use(express.json())
app.use(Profiling.middleware)

// Routing
TableRouting(app)
ChannelRouting(app)
MessageRouting(app)
AuthenticationRouting(app)
MemberRouting(app)

// Sentry.setupExpressErrorHandler(app)

async function startServers() {
  const server = startWebServer(app)

  startSocketServer(server)
}

startServers()

export default app
