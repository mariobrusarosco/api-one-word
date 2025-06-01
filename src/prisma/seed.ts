import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config() // Load environment variables

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  console.log('Database URL:', process.env.DATABASE_URL)

  try {
    // Test the connection
    await prisma.$connect()
    console.log('Database connection successful')

    // Clear existing data
    // This is optional but helps to prevent errors when running seed multiple times
    console.log('Cleaning up existing data...')
    await prisma.tableSeat.deleteMany({})
    await prisma.channel.deleteMany({})
    await prisma.table.deleteMany({})
    await prisma.member.deleteMany({})
    console.log('Cleanup complete')

    // Create fake users
    console.log('Creating users...')
    const users = await prisma.member.createMany({
      skipDuplicates: true,
      data: [
        {
          publicId: USER_LARACROFT.publicId,
          nickname: USER_LARACROFT.nickname,
          firstName: USER_LARACROFT.firstName,
          lastName: USER_LARACROFT.lastName,
          email: USER_LARACROFT.email
        },
        {
          publicId: USER_SHERLOCK_HOLMES.publicId,
          nickname: USER_SHERLOCK_HOLMES.nickname,
          firstName: USER_SHERLOCK_HOLMES.firstName,
          lastName: USER_SHERLOCK_HOLMES.lastName,
          email: USER_SHERLOCK_HOLMES.email
        },
        {
          publicId: USER_WALTER_WHITE.publicId,
          nickname: USER_WALTER_WHITE.nickname,
          firstName: USER_WALTER_WHITE.firstName,
          lastName: USER_WALTER_WHITE.lastName,
          email: USER_WALTER_WHITE.email
        },
        {
          publicId: USER_JESSE_PINKMAN.publicId,
          nickname: USER_JESSE_PINKMAN.nickname,
          firstName: USER_JESSE_PINKMAN.firstName,
          lastName: USER_JESSE_PINKMAN.lastName,
          email: USER_JESSE_PINKMAN.email
        }
      ]
    })
    console.log('Users created')

    // Create the "Friends Forever" table
    console.log('Creating Friends Forever table...')
    const friendsForeverTable = await prisma.table.create({
      data: {
        name: 'Friends Forever'
      }
    })
    console.log('Table created:', friendsForeverTable)

    // Add all users to the table
    console.log('Adding users to the table...')

    // Get all user IDs
    const allUsers = await prisma.member.findMany()

    // Add each user to the "Friends Forever" table
    const tableSeats = await Promise.all(
      allUsers.map(async (user, index) => {
        // Make the first user admin, second moderator, rest guests
        const role = index === 0 ? 'ADMIN' : index === 1 ? 'MODERATOR' : 'GUEST'

        return prisma.tableSeat.create({
          data: {
            memberId: user.publicId,
            tableId: friendsForeverTable.id,
            role: role
          }
        })
      })
    )

    console.log(`${tableSeats.length} users added to the table`)

    // Create a general channel for the table
    const generalChannel = await prisma.channel.create({
      data: {
        name: 'general',
        tableId: friendsForeverTable.id
      }
    })

    console.log('General channel created:', generalChannel)

    console.log('Seeding completed successfully!')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  }
}

const USER_LARACROFT = {
  publicId: '550e8400-e29b-41d4-a716-446655440001',
  nickname: 'Lara Croft',
  firstName: 'Lauren',
  lastName: 'Croft',
  email: 'lara_c@adventures.com'
}

const USER_SHERLOCK_HOLMES = {
  publicId: '550e8400-e29b-41d4-a716-446655440002',
  nickname: 'Sherlock Holmes',
  firstName: 'Arthur',
  lastName: 'Conan Doyle',
  email: 'sherlock@bakerstreet.com'
}

const USER_WALTER_WHITE = {
  publicId: '550e8400-e29b-41d4-a716-446655440003',
  nickname: 'Walter White',
  firstName: 'Walter',
  lastName: 'White',
  email: 'walter@whitesmeth.com'
}

const USER_JESSE_PINKMAN = {
  publicId: '550e8400-e29b-41d4-a716-446655440004',
  nickname: 'Jesse Pinkman',
  firstName: 'Jesse',
  lastName: 'Pinkman',
  email: 'jesse@pinkman.com'
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
