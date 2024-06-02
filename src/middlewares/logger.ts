import { NextFunction, Request, Response } from 'express'

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('[logger]', req.method, req.url)
  console.log('[cookies]', JSON.stringify(req.cookies))
  next()
}

export default logger
