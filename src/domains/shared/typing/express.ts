import { Request } from 'express'

export type AppRequest = Request<any, any, any, Record<string, string>>
