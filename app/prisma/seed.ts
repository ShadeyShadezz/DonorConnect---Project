// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@donorconnect.org' },
    update: {},
    create: {
      email: 'admin@donorconnect.org',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    }
  })
  
  console.log('Created test user:', user.email)
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    // No process.exit - Node.js will exit with code 1 automatically
  })
  .finally(async () => {
    await prisma.$disconnect()
  })