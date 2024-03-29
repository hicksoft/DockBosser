import Dockerode from 'dockerode'

interface ICreateNetworkConfig {
  name: string
  id: number
}

export function getHost() {
  return new Dockerode()
}

export async function isOnline(host: Dockerode) {
  try {
    await host.version()
  } catch (e) {
    return false
  }
  return true
}

export async function getContainers(host: Dockerode) {
  return host.listContainers({ all: true })
}

export async function getNetworks(host: Dockerode) {
  return host.listNetworks()
}

export async function getImages(host: Dockerode) {
  return host.listImages()
}

export async function getVolumes(host: Dockerode) {
  return host.listVolumes()
}

export async function createNetwork(host: Dockerode, config: ICreateNetworkConfig) {
  return host.createNetwork({
    Name: config.name,
    Driver: 'bridge',
    Labels: { boss_id: config.id.toString() },
  })
}

export async function removeNetwork(host: Dockerode, bossId: number) {
  return host.pruneNetworks({ filters: { label: [`boss_id=${bossId}`] } })
}
