// prisma/seed-simple.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting simple seed...')
  
  // Create admin user with plain password (you'll need to change this in production)
  const user = await prisma.user.upsert({
    where: { email: 'admin@donorconnect.org' },
    update: {},
    create: {
      email: 'admin@donorconnect.org',
      password: 'admin123', // You should hash this in a real app
      name: 'Admin User',
      role: 'admin'
    }
  })
  
  console.log('Created user:', user)
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    // No process.exit - Node.js will exit with code 1 automatically
  })
  .finally(async () => {
    await prisma.$disconnect()
  })