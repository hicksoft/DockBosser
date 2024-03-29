import { prisma } from './client'

export function getAllNetworks() {
  return prisma.network.findMany()
}

export function getNetwork(id: number) {
  return prisma.network.findUniqueOrThrow({
    where: { id },
  })
}

export function updateNetworkName(id: number, name: string) {
  return prisma.network.update({
    where: { id },
    data: { name },
  })
}

export function createNetwork(name: string) {
  return prisma.network.create({
    data: {
      name,
    },
  })
}

export function removeNetwork(id: number) {
  return prisma.network.delete({
    where: {
      id,
    },
  })
}
