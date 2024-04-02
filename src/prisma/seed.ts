import { prisma } from '@/lib/store/client'
import { hashPassword } from '@/lib/store/passhash'

async function main() {
  await prisma.setting.create({ data: { name: 'admin_user', value: 'admin' } })
  await prisma.setting.create({ data: { name: 'admin_pass', value: hashPassword('admin') } })
  await prisma.setting.create({ data: { name: 'boss_id', value: '1' } })

  await prisma.$disconnect()
}
main()
