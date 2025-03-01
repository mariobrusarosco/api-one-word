const { execSync } = require('child_process');
const { existsSync } = require('fs');

function executeCommand(command, errorMessage) {
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`❌ ${errorMessage}`);
        console.error(error.message);
        return false;
    }
}

function checkPrerequisites() {
    // Check for yarn
    try {
        execSync('yarn --version', { stdio: 'ignore' });
    } catch {
        console.error('❌ Yarn is not installed. Please install Yarn first.');
        console.log('📝 You can install Yarn by following the instructions at: https://yarnpkg.com/getting-started/install');
        process.exit(1);
    }

    // Check for Docker
    try {
        execSync('docker info', { stdio: 'ignore' });
    } catch {
        console.error('❌ Docker is not running or not installed.');
        console.log('📝 Please make sure Docker is installed and running.');
        console.log('   You can download Docker from: https://www.docker.com/get-started');
        process.exit(1);
    }
}

async function setup() {
    console.log('🚀 Setting up API One Word project...');

    // Check prerequisites
    checkPrerequisites();

    // Install dependencies
    console.log('\n📦 Installing dependencies...');
    if (!executeCommand('yarn install', 'Failed to install dependencies')) {
        process.exit(1);
    }

    // Start docker containers
    console.log('\n🐳 Starting Docker containers...');
    executeCommand('docker compose down -v', 'Failed to stop existing containers');
    if (!executeCommand('docker compose up -d', 'Failed to start Docker containers')) {
        process.exit(1);
    }

    // Wait for PostgreSQL to be ready
    console.log('\n⏳ Waiting for PostgreSQL to be ready...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Generate Prisma client
    console.log('\n🔨 Generating Prisma client...');
    if (!executeCommand('npx prisma generate', 'Failed to generate Prisma client')) {
        process.exit(1);
    }

    // Run migrations
    console.log('\n🔄 Running database migrations...');
    if (!executeCommand('npx prisma migrate deploy', 'Failed to run migrations')) {
        process.exit(1);
    }

    // Run seed script
    console.log('\n🌱 Seeding the database...');
    if (!executeCommand('yarn seed', 'Failed to seed the database')) {
        process.exit(1);
    }

    console.log('\n✅ Setup completed successfully!');
    console.log('🚀 You can now run \'yarn dev\' to start the development server');
}

setup().catch(error => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
}); 