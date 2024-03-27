/*
 * @group integration/docker
 */

import { composeDown, composeUp } from './compose'

describe('Compose', () => {
  it('Up', async () => {
    const callback = jest.fn()
    await composeUp('docker-compose.yml', callback)
    expect(callback).toHaveBeenCalledWith(expect.stringContaining('Started'))
  })

  it('Down', async () => {
    const callback = jest.fn()
    await composeDown('docker-compose.yml', callback)
    expect(callback).toHaveBeenCalledWith(expect.stringContaining('Removed'))
  })
})
