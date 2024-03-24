/*
 * @group integration/db
 */

import { reset } from '../../test/db'
import { getHosts, getSetting } from './db'
import { validatePassword } from './auth'

describe('Database defaults', () => {
  beforeAll(reset)

  it('Admin credentials', async () => {
    await expect(getSetting('admin_user')).resolves.toBe('admin')

    const hash = await getSetting('admin_pass')
    expect(hash).not.toBe('admin')
    expect(validatePassword('admin', hash)).toBe(true)
  })

  it('Hosts', async () => {
    const hosts = await getHosts()

    expect(hosts).toHaveLength(1)
    expect(hosts[0].name).toBe('Local Docker Host')
    expect(hosts[0].host).toBe('/var/run/docker.sock')
  })
})
