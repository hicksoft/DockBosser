/*
 * @group service/network
 */

import { reset } from '../../test/db'
import { generateRandomString } from '../../test/utils'
import { createNetwork, getNetwork, getNetworks, removeNetwork } from './network'
import { resetNetworks } from '../../test/docker'

describe('Network service', () => {
  beforeAll(reset)
  beforeAll(resetNetworks)

  it('Create network', async () => {
    const name = generateRandomString(16)

    const network = await createNetwork(name)
    expect(network.name).toBe(name)
  })

  it('Create network with the same name twice', async () => {
    const name = generateRandomString(16)

    await expect(createNetwork(name)).resolves.toBeTruthy()
    await expect(createNetwork(name)).rejects.toThrow()
  })

  it('Get networks', async () => {
    const name1 = generateRandomString(16)
    const name2 = generateRandomString(16)

    await createNetwork(name1)
    await createNetwork(name2)

    const networks = await getNetworks()
    expect(networks.filter((n) => n.name === name1)).toHaveLength(1)
    expect(networks.filter((n) => n.name === name2)).toHaveLength(1)
  })

  it('Get and remove network', async () => {
    const name = generateRandomString(16)
    const network = await createNetwork(name)

    const bossId = network.boss_id || 0

    await expect(getNetwork(bossId)).resolves.toBeTruthy()

    await removeNetwork(bossId)

    await expect(getNetwork(bossId)).rejects.toThrow()
  })
})
