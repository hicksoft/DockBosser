/*
 * @group db
 */

import { reset } from '../../test/db'
import { addHost, updateHost, removeHost, getHost, getAllHosts } from './host'

describe('Host functions', () => {
  beforeAll(reset)

  it('Default host', async () => {
    const hosts = await getAllHosts()

    expect(hosts.length).toBe(1)
    expect(hosts[0].name).toBe('Local Docker Host')
    expect(hosts[0].host).toBe('/var/run/docker.sock')
  })

  it('Create host', async () => {
    const name = 'host name 1'
    const host = 'somesite.com'
    const protocol = 'http'
    const port = 3000

    const result = await addHost(name, host, protocol, port)

    expect(result).toEqual({ id: result.id, name, host, protocol, port })
    await expect(getHost(result.id)).resolves.toEqual({ id: result.id, name, host, protocol, port })
  })

  it('Update host', async () => {
    const result_pre = await addHost('1', '1', '1', 1)

    const name = 'host name 2'
    const host = 'somesite.com'
    const protocol = 'http'
    const port = 3000

    const result_post = await updateHost(result_pre.id, name, host, protocol, port)

    await expect(result_post).toEqual({ id: result_pre.id, name, host, protocol, port })
    await expect(getHost(result_pre.id)).resolves.toEqual({ id: result_pre.id, name, host, protocol, port })
  })

  it('Remove host', async () => {
    const result = await addHost('2', '2', '2', 2)

    await expect(getHost(result.id)).resolves.toBeDefined()

    await removeHost(result.id)

    await expect(getHost(result.id)).rejects.toThrow()
  })
})
