import { prisma } from './client'

export async function getNextBossId() {
  const setting = await prisma.setting.findUniqueOrThrow({ where: { name: 'boss_id' } })
  const id = parseInt(setting.value)
  await prisma.setting.update({
    data: {
      value: (id + 1).toString(),
    },
    where: {
      name: 'boss_id',
    },
  })
  return id
}
