import express from 'express'
import cookieParser from 'cookie-parser'

import TableRouting from './domains/table/routes'
import ChannelRouting from './domains/channel/routes'
import MessageRouting from './domains/message/routes'

import logger from './middlewares/logger'
import authentication from './middlewares/authentication'

const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()

// // Temp middlewares

// app.set('trust proxy', 1)

const corsConfig = {
  origin: 'http://localhost:5173',
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
app.use(authentication)

// Rest routes - temporary place
TableRouting(app)
ChannelRouting(app)
MessageRouting(app)
// UserRouting(app)
// AuthRouting(app)
// Rest routes - temporary place'

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Lis!!!!!tening on port ${PORT} ${process.env.API_VERSION}/tables`)
    console.log('complicado', `${process.env.API_VERSION}`)
    console.log('----------', process.env.ACESS_CONTROL_ALLOW_ORIGIN)
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
