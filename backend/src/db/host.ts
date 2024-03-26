import { prisma } from './client'

export function getAllHosts() {
  return prisma.host.findMany()
}

export function getHost(id: number) {
  return prisma.host.findUniqueOrThrow({
    where: { id },
  })
}

export function addHost(name: string, host: string, protocol: string, port: number) {
  return prisma.host.create({
    data: {
      name,
      host,
      protocol,
      port,
    },
  })
}

export function updateHost(
  id: number,
  name: string | undefined,
  host: string | undefined,
  protocol: string | undefined,
  port: number | undefined,
) {
  return prisma.host.update({
    where: { id },
    data: {
      name,
      host,
      protocol,
      port,
    },
  })
}

export function removeHost(id: number) {
  return prisma.host.delete({
    where: { id },
  })
}
