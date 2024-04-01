/*
 * @group integration/docker
 */

import { generateRandomString } from '../../test/utils'
import { initHost, isHostOnline, createHostNetwork, removeHostNetwork, getHostNetworks } from './host'

describe('Docker host', () => {
  it('Is online', async () => {
    const host = initHost()
    await expect(isHostOnline(host)).resolves.toBe(true)
  })

  it('Remove network', async () => {
    const name = generateRandomString(32)

    const host = initHost()
    const network = await createHostNetwork(host, { name, bossId: 1 })
    const preNetworks = await getHostNetworks(host)
    expect(preNetworks.filter((n) => n.Id === network.id)).toHaveLength(1)

    await removeHostNetwork(host, 1)
    const postNetworks = await getHostNetworks(host)
    expect(postNetworks.filter((n) => n.Id === network.id)).toHaveLength(0)
  })
})
