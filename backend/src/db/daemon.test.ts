/*
 * @group integration/db
 */

import { reset } from '../../test/db'
import { addDaemon, updateDaemon, removeDaemon, getDaemon, getAllDaemons } from './daemon'

describe('Daemon functions', () => {
  beforeAll(reset)

  it('Default daemon', async () => {
    const daemons = await getAllDaemons()

    expect(daemons.length).toBe(1)
    expect(daemons[0].name).toBe('Local Docker Daemon')
    expect(daemons[0].path).toBe('/var/run/docker.sock')
  })

  it('Create daemon', async () => {
    const name = 'daemon name 1'
    const path = 'some/path/here'

    const result = await addDaemon(name, path)

    expect(result).toEqual({ id: result.id, name, path })
    await expect(getDaemon(result.id)).resolves.toEqual({ id: result.id, name, path })
  })

  it('Update daemon', async () => {
    const result_pre = await addDaemon('1', '1')

    const name = 'daemon name 2'
    const path = 'some/path/here'

    const result_post = await updateDaemon(result_pre.id, name, path)

    await expect(result_post).toEqual({ id: result_pre.id, name, path })
    await expect(getDaemon(result_pre.id)).resolves.toEqual({ id: result_pre.id, name, path })
  })

  it('Remove daemon', async () => {
    const result = await addDaemon('2', '2')

    await expect(getDaemon(result.id)).resolves.toBeDefined()

    await removeDaemon(result.id)

    await expect(getDaemon(result.id)).rejects.toThrow()
  })
})
