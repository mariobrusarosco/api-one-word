import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.demo.local' }); // Load demo environment variables

// Validate reset token if provided
if (process.env.RESET_TOKEN && process.env.RESET_TOKEN !== process.env.DEMO_RESET_TOKEN) {
  console.error('❌ Invalid reset token');
  process.exit(1);
}

// Ensure we're in demo environment
if (process.env.NODE_ENV !== 'demo') {
  console.error('❌ This script can only run in demo environment');
  process.exit(1);
}

async function resetDemo() {
  console.log('🚀 Starting demo environment reset...');
  
  try {
    // 1. Reset the database
    console.log('🔄 Resetting database...');
    const prisma = new PrismaClient();
    
    // Connect to the database
    await prisma.$connect();
    
    // Reset data (order matters due to foreign key constraints)
    console.log('🧹 Cleaning up existing data...');
    await prisma.$transaction([
      prisma.tableSeat.deleteMany({}),
      prisma.channel.deleteMany({}),
      prisma.table.deleteMany({}),
      prisma.member.deleteMany({}),
    ]);
    
    // 2. Run the seed script
    console.log('🌱 Seeding demo data...');
    execSync('yarn ts-node src/prisma/seed.ts', { stdio: 'inherit' });
    
    console.log('✅ Demo environment reset successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting demo environment:', error);
    process.exit(1);
  }
}

resetDemo();
