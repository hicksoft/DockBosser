/*
 * @group integration/db
 */

import { reset } from '../../test/db'
import { getAllSettings, getSetting, updateSetting } from './setting'

describe('Setting functions', () => {
  beforeAll(reset)

  it('Default settings', async () => {
    await expect(getSetting('admin_user')).resolves.toEqual('admin')

    const password = await getSetting('admin_pass')
    expect(typeof password).toBe('string')
    expect(password).not.toBe('admin')
  })

  it('Get all settings', async () => {
    const result = await getAllSettings()

    expect(result.map((r) => r.name).sort()).toEqual(['admin_user'].sort())
  })

  it('Update setting', async () => {
    const value_pre = await getSetting('admin_user')

    const result = await updateSetting('admin_user', 'username')

    const value_post = await getSetting('admin_user')

    expect(value_pre).toBe('admin')
    expect(result).toBe('username')
    expect(value_post).toBe('username')
  })
})
