/*
 * @group integration/docker
 */

import { getDaemon, isOnline, getContainers, getImages, getNetworks } from './daemon'

const VALID_PATH = '/var/run/docker.sock'
const INVALID_PATH = 'fake/path/docker.sock'

describe('Docker daemon - is online', () => {
  it('Valid daemon', async () => {
    const daemon = getDaemon(VALID_PATH)
    await expect(isOnline(daemon)).resolves.toBe(true)
  })

  it('Invalid daemon', async () => {
    const daemon = getDaemon(INVALID_PATH)
    await expect(isOnline(daemon)).resolves.toBe(false)
  })
})

describe('Docker daemon - list containers', () => {
  it('Valid daemon', async () => {
    // expect a result. Result is an array of unknown contents because of poor docker environment controls
    const daemon = getDaemon(VALID_PATH)
    await expect(getContainers(daemon)).resolves.toBeTruthy()
  })

  it('Invalid daemon', async () => {
    const daemon = getDaemon(INVALID_PATH)
    await expect(getContainers(daemon)).resolves.toEqual([])
  })
})

describe('Docker daemon - list networks', () => {
  it('Valid daemon', async () => {
    // expect a result. Result is an array of unknown contents because of poor docker environment controls
    const daemon = getDaemon(VALID_PATH)
    await expect(getNetworks(daemon)).resolves.toBeTruthy()
  })

  it('Invalid daemon', async () => {
    const daemon = getDaemon(INVALID_PATH)
    await expect(getNetworks(daemon)).resolves.toEqual([])
  })
})

describe('Docker daemon - list images', () => {
  it('Valid daemon', async () => {
    // expect a result. Result is an array of unknown contents because of poor docker environment controls
    const daemon = getDaemon(VALID_PATH)
    await expect(getImages(daemon)).resolves.toBeTruthy()
  })

  it('Invalid daemon', async () => {
    const daemon = getDaemon(INVALID_PATH)
    await expect(getImages(daemon)).resolves.toEqual([])
  })
})
