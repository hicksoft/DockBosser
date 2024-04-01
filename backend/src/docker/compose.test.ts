/*
 * @group integration/docker
 */

import path from 'path'
import { composeDown, composeUp } from './compose'

describe('Compose', () => {
  it('Up', async () => {
    const dir = path.resolve(process.env['COMPOSE_DIR'] as string, 'test')
    const callback = jest.fn()
    await composeUp(dir, callback)
    expect(callback).toHaveBeenCalledWith(expect.stringContaining('Started'))
  })

  it('Down', async () => {
    const dir = path.resolve(process.env['COMPOSE_DIR'] as string, 'test')
    const callback = jest.fn()
    await composeDown(dir, callback)
    expect(callback).toHaveBeenCalledWith(expect.stringContaining('Removed'))
  })
})
