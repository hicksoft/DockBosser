/*
 * @group integration/db
 */

import { reset } from '../../test/db'
import { validateLogin } from './auth'
import { updateSetting } from './setting'

describe('Host functions', () => {
  beforeAll(reset)

  it('Default auth', async () => {
    await expect(validateLogin('admin', 'admin')).resolves.toBe(true)
    await expect(validateLogin('wrong', 'admin')).resolves.toBe(false)
    await expect(validateLogin('admin', 'wrong')).resolves.toBe(false)
  })

  it('Update settings', async () => {
    await updateSetting('admin_user', 'newadmin')
    await updateSetting('admin_pass', 'newpassword')

    await expect(validateLogin('newadmin', 'newpassword')).resolves.toBe(true)
    await expect(validateLogin('admin', 'admin')).resolves.toBe(false)
  })
})
