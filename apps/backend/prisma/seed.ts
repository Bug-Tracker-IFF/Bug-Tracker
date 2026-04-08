import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  // Create Gerente (Admin)
  await prisma.user.upsert({
    where: { email: 'gerente@bugtracker.com' },
    update: {},
    create: {
      email: 'gerente@bugtracker.com',
      name: 'Gerente Admin',
      password: passwordHash,
      role: 'GERENTE',
    },
  })

  // Create Desenvolvedor
  await prisma.user.upsert({
    where: { email: 'dev@bugtracker.com' },
    update: {},
    create: {
      email: 'dev@bugtracker.com',
      name: 'Dev Junior',
      password: passwordHash,
      role: 'DESENVOLVEDOR',
    },
  })

  // Create QA
  await prisma.user.upsert({
    where: { email: 'qa@bugtracker.com' },
    update: {},
    create: {
      email: 'qa@bugtracker.com',
      name: 'Tester QA',
      password: passwordHash,
      role: 'QA',
    },
  })

  console.log('Seed: Users created successfully (Password: 123456)')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
