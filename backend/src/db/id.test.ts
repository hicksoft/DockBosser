/*
 * @group integration/db
 */

import { getNextBossId } from './id'

it('Next boss_id', async () => {
  const id = await getNextBossId()
  const nextId = await getNextBossId()
  expect(nextId).toBe(id + 1)
})
