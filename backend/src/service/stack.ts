import fs from 'fs'
import path from 'path'
import { composeDown, composeUp } from '../docker/compose'

function getRoot() {
  return process.env['COMPOSE_DIR'] || '/stacks'
}

function getPaths(name: string) {
  const root = getRoot()
  return {
    dir: path.resolve(root, name),
    compose: path.resolve(root, name, 'compose.yml'),
    env: path.resolve(root, name, '.env'),
  }
}

export async function getStacks() {
  const root = getRoot()
  const dir = fs.readdirSync(root, { withFileTypes: true })
  return dir.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name)
}

export async function readStack(name: string) {
  const { compose } = getPaths(name)
  return fs.readFileSync(compose, 'utf-8')
}

export async function saveStack(name: string, fileContents: string) {
  const { dir, compose } = getPaths(name)
  fs.mkdirSync(dir, { recursive: true })
  return fs.writeFileSync(compose, fileContents, 'utf-8')
}

export async function removeStack(name: string) {
  const { dir } = getPaths(name)
  return fs.rmSync(dir, { recursive: true, force: true })
}

export async function startStack(name: string, streamCallback: () => void) {
  const { dir } = getPaths(name)
  return composeUp(dir, streamCallback)
}

export async function stopStack(name: string, streamCallback: () => void) {
  const { dir } = getPaths(name)
  return composeDown(dir, streamCallback)
}
