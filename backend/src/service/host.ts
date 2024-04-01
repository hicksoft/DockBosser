import { ResponseError } from '../ResonseError'
import { initHost, isHostOnline } from '../docker/host'

export async function getHost() {
  const host = initHost()

  const online = await isHostOnline(host)
  if (!online) throw new ResponseError('Docker host is not reachable', null, 503)

  return host
}
