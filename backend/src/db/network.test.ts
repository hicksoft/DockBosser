/*
 * @group integration/db
 */

import { reset } from '../../test/db'
import { getAllNetworks, createNetwork, removeNetwork, getNetwork, updateNetworkName } from './network'

describe('Network functions', () => {
  beforeAll(reset)

  it('Get all networks - none to start', async () => {
    await expect(getAllNetworks()).resolves.toHaveLength(0)
  })

  it('Create a network', async () => {
    const name = 'test'
    const network = await createNetwork(name)
    expect(network.name).toBe(name)
  })

  it('Get all networks', async () => {
    await createNetwork('test1')
    await createNetwork('test2')
    await expect(getAllNetworks()).resolves.not.toHaveLength(0)
  })

  it('Update a network name', async () => {
    const oldNetwork = await createNetwork('old')

    const name = 'new'
    const network = await updateNetworkName(oldNetwork.id, name)
    expect(network.name).toBe(name)
  })

  it('Get and remove a network', async () => {
    const network = await createNetwork('testnet')
    await expect(getNetwork(network.id)).resolves.toBeTruthy()
    await removeNetwork(network.id)
    await expect(getNetwork(network.id)).rejects.toThrow()
  })
})
