import { prisma } from './client'

export async function getSetting(name: string) {
  const result = await prisma.setting.findUniqueOrThrow({ where: { name } })
  return result.value
}

export function getHosts() {
  return prisma.host.findMany()
}
