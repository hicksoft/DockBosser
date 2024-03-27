/*
 * @group integration/docker
 */

import { getDaemon, isOnline, getContainers, getImages, getNetworks } from './daemon'

it('Docker daemon - is online', async () => {
  const daemon = getDaemon()
  await expect(isOnline(daemon)).resolves.toBe(true)
})

it('Docker daemon - list containers', async () => {
  // expect a result. Result is an array of unknown contents because of poor docker environment controls
  const daemon = getDaemon()
  await expect(getContainers(daemon)).resolves.toBeTruthy()
})

it('Docker daemon - list networks', async () => {
  // expect a result. Result is an array of unknown contents because of poor docker environment controls
  const daemon = getDaemon()
  await expect(getNetworks(daemon)).resolves.toBeTruthy()
})

it('Docker daemon - list images', async () => {
  // expect a result. Result is an array of unknown contents because of poor docker environment controls
  const daemon = getDaemon()
  await expect(getImages(daemon)).resolves.toBeTruthy()
})
