import Dockerode from 'dockerode'

export function getDaemon() {
  return new Dockerode()
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
  return await daemon.listContainers({ all: true })
}

export async function getNetworks(daemon: Dockerode) {
  return await daemon.listNetworks()
}

export async function getImages(daemon: Dockerode) {
  return await daemon.listImages()
}
