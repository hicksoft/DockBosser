import { hashPassword } from './auth'
import { prisma } from './client'

type SettingName = 'admin_user' | 'admin_pass'

export function getAllSettings() {
  return prisma.setting.findMany({
    where: {
      name: { not: 'admin_pass' },
    },
  })
}

export async function getSetting(name: SettingName) {
  const result = await prisma.setting.findUniqueOrThrow({
    where: { name },
  })
  return result.value
}

export async function updateSetting(name: SettingName, value: string) {
  if (name === 'admin_pass') value = hashPassword(value)

  const result = await prisma.setting.update({
    where: { name },
    data: { value },
  })
  return result.value
}
