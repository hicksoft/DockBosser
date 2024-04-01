/*
 * @group service/stack
 */

import { clearStacks } from '../../test/stack'
import { getStacks, readStack, removeStack, saveStack, startStack, stopStack } from './stack'

describe('Stack service', () => {
  beforeAll(clearStacks)

  it('Save and retrieve stacks', async () => {
    const stack1 = {
      name: 'stack1',
      contents: 'stack 1 contents',
    }

    const stack2 = {
      name: 'stack2',
      contents: 'stack 2 contents',
    }

    await saveStack(stack1.name, stack1.contents)
    await saveStack(stack2.name, stack2.contents)

    const result1 = await readStack(stack1.name)
    const result2 = await readStack(stack2.name)

    const stackNames = await getStacks()

    expect(stackNames.sort()).toEqual(['test', stack1.name, stack2.name].sort())
    expect(result1).toBe(stack1.contents)
    expect(result2).toBe(stack2.contents)
  })

  it('Remove stack', async () => {
    const name = 'stack3'
    await saveStack(name, 'content')
    await expect(readStack(name)).resolves.toBeTruthy()
    await removeStack(name)
    await expect(readStack(name)).rejects.toThrow()
  })

  it('Start stack', async () => {
    const fn = jest.fn()
    await startStack('test', fn)
    expect(fn.mock.calls.length).toBeGreaterThan(1)
    expect(fn).toHaveBeenCalledWith(expect.stringContaining('Started'))
  })

  it('Stop stack', async () => {
    const fn = jest.fn()
    await stopStack('test', fn)
    expect(fn.mock.calls.length).toBeGreaterThan(1)
    expect(fn).toHaveBeenCalledWith(expect.stringContaining('Removed'))
  })
})
