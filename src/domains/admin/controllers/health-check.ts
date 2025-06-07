import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

type HealthStatus = 'ok' | 'error'

interface HealthCheckResponse {
  status: HealthStatus
  uptime: number
  timestamp: string
  database?: {
    status: HealthStatus
    message?: string
  }
  responseTime?: string
}

export async function healthCheck(req: Request, res: Response) {
  const startTime = Date.now()
  const health: HealthCheckResponse = { 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  }

  try {
    // Check database connection
    const prisma = new PrismaClient()
    await prisma.$connect()
    await prisma.$disconnect()

    health.database = { status: 'ok' }
  } catch (error) {
    health.database = { 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown database error'
    }
    health.status = 'error'
  }

  // Add response time
  health.responseTime = `${Date.now() - startTime}ms`

  const status = health.status === 'ok' ? 200 : 503
  res.status(status).json(health)
}
