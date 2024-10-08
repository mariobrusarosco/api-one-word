import { NextFunction, Request, Response } from 'express'

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('[LOGGER] - ROUTE', req.method, req.url)
  console.log('[LOGGER] - COOKIES', JSON.stringify(req.cookies))
  next()
}

export default logger
