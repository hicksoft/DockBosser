/*
 * @group integration/db
 */

import { reset } from '../../test/db'
import { addHost, updateHost, removeHost, getHost, getAllHosts } from './host'

describe('Host functions', () => {
  beforeAll(reset)

  it('Default host', async () => {
    const hosts = await getAllHosts()

    expect(hosts.length).toBe(1)
    expect(hosts[0].name).toBe('Local Docker Host')
    expect(hosts[0].path).toBe('/var/run/docker.sock')
  })

  it('Create host', async () => {
    const name = 'host name 1'
    const path = 'some/path/here'

    const result = await addHost(name, path)

    expect(result).toEqual({ id: result.id, name, path })
    await expect(getHost(result.id)).resolves.toEqual({ id: result.id, name, path })
  })

  it('Update host', async () => {
    const result_pre = await addHost('1', '1')

    const name = 'host name 2'
    const path = 'some/path/here'

    const result_post = await updateHost(result_pre.id, name, path)

    await expect(result_post).toEqual({ id: result_pre.id, name, path })
    await expect(getHost(result_pre.id)).resolves.toEqual({ id: result_pre.id, name, path })
  })

  it('Remove host', async () => {
    const result = await addHost('2', '2')

    await expect(getHost(result.id)).resolves.toBeDefined()

    await removeHost(result.id)

    await expect(getHost(result.id)).rejects.toThrow()
  })
})
