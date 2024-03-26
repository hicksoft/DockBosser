import { prisma } from './client'

export function getAllDaemons() {
  return prisma.daemon.findMany()
}

export function getDaemon(id: number) {
  return prisma.daemon.findUniqueOrThrow({
    where: { id },
  })
}

export function addDaemon(name: string, path: string) {
  return prisma.daemon.create({
    data: {
      name,
      path,
    },
  })
}

export function updateDaemon(id: number, name: string | undefined, path: string | undefined) {
  return prisma.daemon.update({
    where: { id },
    data: {
      name,
      path,
    },
  })
}

export function removeDaemon(id: number) {
  return prisma.daemon.delete({
    where: { id },
  })
}
