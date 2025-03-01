import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  console.log('Database URL:', process.env.DATABASE_URL);
  
  try {
    // Test the connection
    await prisma.$connect();
    console.log('Database connection successful');

    // Clear existing data
    // This is optional but helps to prevent errors when running seed multiple times
    console.log('Cleaning up existing data...');
    await prisma.tableSeat.deleteMany({});
    await prisma.channel.deleteMany({});
    await prisma.table.deleteMany({});
    await prisma.member.deleteMany({});
    console.log('Cleanup complete');

    // Create fake users
    console.log('Creating users...');
    const users = await prisma.member.createMany({
      skipDuplicates: true,
      data: [
        {
          publicId: '1',
          nickname: 'Lara Croft',
          firstName: 'Lauren',
          lastName: 'Croft',
          email: 'lara_c@adventures.com',
        },
        {
          publicId: '2',
          nickname: 'Sherlock Holmes',
          firstName: 'Arthur',
          lastName: 'Conan Doyle',
          email: 'sherlock@bakerstreet.com',
        },
        {
          publicId: '3',
          nickname: 'Walter White',
          firstName: 'Walter',
          lastName: 'White',
          email: 'walter@whitesmeth.com',
        },
        {
          publicId: '4',
          nickname: 'Jesse Pinkman',
          firstName: 'Jesse',
          lastName: 'Pinkman',
          email: 'jesse@pinkman.com',
        },
      ],
    });
    console.log('Users created');

    // Create the "Friends Forever" table
    console.log('Creating Friends Forever table...');
    const friendsForeverTable = await prisma.table.create({
      data: {
        name: 'Friends Forever',
        inviteCode: 'FRIENDS4EVER',
      },
    });
    console.log('Table created:', friendsForeverTable);

    // Add all users to the table
    console.log('Adding users to the table...');
    
    // Get all user IDs
    const allUsers = await prisma.member.findMany();
    
    // Add each user to the "Friends Forever" table
    const tableSeats = await Promise.all(
      allUsers.map(async (user, index) => {
        // Make the first user admin, second moderator, rest guests
        const role = index === 0 ? 'ADMIN' : (index === 1 ? 'MODERATOR' : 'GUEST');
        
        return prisma.tableSeat.create({
          data: {
            memberId: user.publicId,
            tableId: friendsForeverTable.id,
            role: role,
          },
        });
      })
    );
    
    console.log(`${tableSeats.length} users added to the table`);

    // Create a general channel for the table
    const generalChannel = await prisma.channel.create({
      data: {
        name: 'general',
        tableId: friendsForeverTable.id,
      },
    });
    
    console.log('General channel created:', generalChannel);
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });