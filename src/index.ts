import express from 'express'
import cookieParser from 'cookie-parser'

import TableRouting from './domains/table/routes'

import logger from './middlewares/logger'
import authentication from './middlewares/authentication'

// const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()

// console.log('----------', process.env.ACESS_CONTROL_ALLOW_ORIGIN, process.env.NODE_ENV)
// // Temp middlewares

// app.set('trust proxy', 1)

// const corsConfig = {
//   origin: process.env.ACESS_CONTROL_ALLOW_ORIGIN,
//   credentials: true
// }
// app.use(cors(corsConfig))
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
// LeagueRouting(app)
// UserRouting(app)
// MatchRouting(app)
// AuthRouting(app)
// Rest routes - temporary place'

// Playground Area
// FileRouting(app)
// ServingWebsites(app)
// TemplateEngines(app)

async function startServer() {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
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
