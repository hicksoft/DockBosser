import path from 'path'
import fs from 'fs'

const ROOT = process.env['COMPOSE_DIR'] as string

export function clearStacks() {
  const dir = fs.readdirSync(ROOT, { withFileTypes: true })
  dir
    .filter((d) => d.name !== 'test')
    .forEach((d) => fs.rmSync(path.resolve(ROOT, d.name), { recursive: true, force: true }))
}
