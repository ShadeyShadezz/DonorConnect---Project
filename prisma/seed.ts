import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

config()

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@donorconnect.org' },
    update: {
      password: hashedPassword
    },
    create: {
      email: 'admin@donorconnect.org',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    }
  })
  
  console.log('✅ Seeded admin user:', { id: user.id, email: user.email, role: user.role })
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
