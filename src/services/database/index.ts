import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// TODO Disconnect the Prisma client when the server is stopped and catch the error

export default prisma
