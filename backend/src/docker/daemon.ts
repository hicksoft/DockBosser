import Dockerode from 'dockerode'

export function getDaemon(path: string) {
  return new Dockerode({ socketPath: path })
}

export async function isOnline(daemon: Dockerode) {
  try {
    await daemon.version()
  } catch (e) {
    return false
  }
  return true
}

export async function getContainers(daemon: Dockerode) {
  try {
    const containers = await daemon.listContainers({ all: true })
    return containers
  } catch (e) {
    return []
  }
}

export async function getNetworks(daemon: Dockerode) {
  try {
    const networks = await daemon.listNetworks()
    return networks
  } catch (e) {
    return []
  }
}

export async function getImages(daemon: Dockerode) {
  try {
    const images = await daemon.listImages()
    return images
  } catch (e) {
    return []
  }
}
