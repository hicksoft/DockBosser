/*
 * @group integration/docker
 */

import { generateRandomString } from '../../test/utils'
import { getHost, isOnline, createNetwork, removeNetwork, getNetworks } from './host'

describe('Docker host', () => {
  it('Is online', async () => {
    const host = getHost()
    await expect(isOnline(host)).resolves.toBe(true)
  })

  it('Remove network', async () => {
    const name = generateRandomString(32)

    const host = getHost()
    const network = await createNetwork(host, { name, id: 1 })
    const preNetworks = await getNetworks(host)
    expect(preNetworks.filter((n) => n.Id === network.id)).toHaveLength(1)

    await removeNetwork(host, 1)
    const postNetworks = await getNetworks(host)
    expect(postNetworks.filter((n) => n.Id === network.id)).toHaveLength(0)
  })
})
