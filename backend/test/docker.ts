import Dockerode from 'dockerode'

export async function resetNetworks() {
  const host = new Dockerode()
  await host.pruneNetworks()
}
