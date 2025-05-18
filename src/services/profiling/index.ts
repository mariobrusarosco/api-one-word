import * as Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'

const isProd = process.env.ENV === 'production'

const Profiling = {
  error: (msg: string) => {
    if (isProd) {
      Sentry.captureMessage(msg)
    }

    console.error('[ERROR]', msg)
  },
  middleware: (req: Request, res: Response, next: NextFunction) => {
    // console.log('[LOGGER] - ROUTE', req.method, req.url)
    // console.log('[LOGGER] - COOKIES', JSON.stringify(req.cookies))
    next()
  },
  log: (msg: string, data?: any) => {
    if (!isProd) console.log('[LOG]', msg, data)
  }
}

export default Profiling
