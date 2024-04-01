import { ResponseError } from '../ResonseError'
import { getHost } from './host'
import { getHostNetworks, getHostNetwork, createHostNetwork, removeHostNetwork } from '../docker/host'
import { NetworkInspectInfo } from 'dockerode'
import { getNextBossId } from '../db/id'

function serialize(network: NetworkInspectInfo) {
  return {
    id: network.Id,
    name: network.Name,
    driver: network.Driver,
    containers: Object.keys(network?.Containers || {}),
    managed: network.Labels?.boss_id !== undefined,
    boss_id: network.Labels?.boss_id !== undefined ? parseInt(network.Labels?.boss_id) : null,
  }
}

export async function getNetworks() {
  try {
    const host = await getHost()
    const networks = await getHostNetworks(host)
    return networks.map((network) => serialize(network))
  } catch (e) {
    if (e instanceof ResponseError) throw e
    else throw new ResponseError('Could not create network', e, 500)
  }
}

export async function getNetwork(bossId: number) {
  try {
    const host = await getHost()
    const network = await getHostNetwork(host, bossId)
    return serialize(network)
  } catch (e) {
    if (e instanceof ResponseError) throw e
    else throw new ResponseError('Could not create network', e, 500)
  }
}

export async function createNetwork(name: string) {
  try {
    const host = await getHost()
    const bossId = await getNextBossId()
    const network = await createHostNetwork(host, { name, bossId })
    const networkInfo = await network.inspect()
    return serialize(networkInfo)
  } catch (e) {
    if (e instanceof ResponseError) throw e
    else throw new ResponseError('Could not create network', e, 500)
  }
}

export async function removeNetwork(bossId: number) {
  try {
    const host = await getHost()
    await removeHostNetwork(host, bossId)
  } catch (e) {
    if (e instanceof ResponseError) throw e
    else throw new ResponseError('Could not remove network', e, 500)
  }
}
