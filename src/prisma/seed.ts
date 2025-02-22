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

    // Create fake users
    const users = await prisma.member.createMany({
      skipDuplicates: true, // Add this to skip duplicates
      data: [
        {
          publicId: '1',
          nickname: 'Lara Croft',
          firstName: 'Lauren',
          lastName: 'Francis',
          email: 'lara_c@adventures.com',
        },
        {
          publicId: '2',
          nickname: 'Sherlock Holmes',
          firstName: 'Arthur', // Example first name
          lastName: 'Conan Doyle', // Example last name
          email: 'sherlock@bakerstreet.com',
        },
        {
          publicId: '3',
          nickname: 'Walter White',
          firstName: 'Walter', // Example first name
          lastName: 'White', // Example last name
          email: 'walter@whitesmeth.com',
        },
        {
          publicId: '4',
          nickname: 'Jesse Pinkman',
          firstName: 'Jesse', // Example first name
          lastName: 'Pinkman', // Example last name
          email: 'jesse@pinkman.com',
        },
      ],
    });

    console.log('Fake users created:', users);
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