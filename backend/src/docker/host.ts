import Dockerode from 'dockerode'

interface ICreateNetworkConfig {
  name: string
  bossId: number
}

export function initHost() {
  return new Dockerode()
}

export async function isHostOnline(host: Dockerode) {
  try {
    await host.version()
  } catch (e) {
    return false
  }
  return true
}

export async function getHostContainers(host: Dockerode) {
  return host.listContainers({ all: true })
}

export async function getHostImages(host: Dockerode) {
  return host.listImages()
}

export async function getHostVolumes(host: Dockerode) {
  return host.listVolumes()
}

export async function getHostNetworks(host: Dockerode) {
  return host.listNetworks()
}

export async function getHostNetwork(host: Dockerode, bossId: number) {
  const networks = await host.listNetworks({ filters: JSON.stringify({ label: [`boss_id=${bossId}`] }) })
  if (networks.length !== 1) throw new Error('Network not found')
  return networks[0]
}

export async function createHostNetwork(host: Dockerode, config: ICreateNetworkConfig) {
  return host.createNetwork({
    Name: config.name,
    Driver: 'bridge',
    Labels: { boss_id: config.bossId.toString() },
  })
}

export async function removeHostNetwork(host: Dockerode, bossId: number) {
  return host.pruneNetworks({ filters: { label: [`boss_id=${bossId}`] } })
}
