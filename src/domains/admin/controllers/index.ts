import { Request, Response, RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const resetDemo: RequestHandler = async function (req: Request, res: Response) {
  // 1. Validate environment
  if (process.env.NODE_ENV !== 'demo') {
    res.status(403).json({
      success: false,
      error: 'This endpoint is only available in demo environment'
    })
    return
  }

  // 2. Validate token
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : ''

  try {
    if (!token || !jwt.verify(token, process.env.JWT_SECRET as string)) {
      res.status(401).json({
        success: false,
        error: 'Invalid or missing reset token'
      })
      return
    }
  } catch {
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    })
    return
  }

  try {
    console.log('🚀 Starting demo reset via API...')
    const prisma = new PrismaClient()

    // 1. Connect to the database
    await prisma.$connect()

    // 2. Reset data (order matters due to foreign key constraints)
    console.log('🧹 Cleaning up existing data...')
    await prisma.$transaction([
      prisma.tableSeat.deleteMany(),
      prisma.channel.deleteMany(),
      prisma.table.deleteMany(),
      prisma.member.deleteMany()
    ])

    // 3. Run seed
    console.log('🌱 Seeding demo data...')

    /*
    This PostgreSQL query is a safety measure that terminates all other active database connections except the current one (that's what pid <> pg_backend_pid() ensures). Here's why it's useful:

    When running database operations like seeding, having multiple active connections can cause conflicts
    Sometimes connections might hang or remain open from previous operations
    */
    await prisma.$executeRaw`SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = current_database()
        AND pid <> pg_backend_pid();`

    await import('@/prisma/seed')

    await prisma.$disconnect()

    console.log('✅ Demo reset successful')
    res.status(200).json({
      success: true,
      message: 'Demo environment reset successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error(`[ADMIN - RESET DEMO] ${error}`)

    res.status(500).json({
      success: false,
      error: 'Failed to reset demo environment',
      details: process.env.NODE_ENV === 'demo' ? error.message : undefined
    })
  }
}

export const AdminController = {
  resetDemo
}
