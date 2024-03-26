import { prisma } from './client'

export function getAllHosts() {
  return prisma.host.findMany()
}

export function getHost(id: number) {
  return prisma.host.findUniqueOrThrow({
    where: { id },
  })
}

export function addHost(name: string, path: string) {
  return prisma.host.create({
    data: {
      name,
      path,
    },
  })
}

export function updateHost(id: number, name: string | undefined, path: string | undefined) {
  return prisma.host.update({
    where: { id },
    data: {
      name,
      path,
    },
  })
}

export function removeHost(id: number) {
  return prisma.host.delete({
    where: { id },
  })
}
