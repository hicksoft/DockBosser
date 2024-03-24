import { prisma } from '../src/db/client'

async function main() {
  await prisma.setting.create({ data: { name: 'admin_user', value: 'admin' } })
  await prisma.setting.create({ data: { name: 'admin_pass', value: 'admin' } })

  await prisma.host.create({ data: { name: 'Local Docker Host', host: '/var/run/docker.sock' } })

  await prisma.$disconnect()
}
main()
