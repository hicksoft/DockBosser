import path from 'path'
import { v2 as compose } from 'docker-compose'

type Output = (output: string) => void

export function composeUp(composename: string, output: Output) {
  return compose.upAll(options(composename, output))
}

export function composeDown(composename: string, output: Output) {
  return compose.downAll(options(composename, output))
}

const options = (composename: string, output: Output) => ({
  cwd: path.resolve(process.env['COMPOSE_DIR'] as string, composename),
  callback: (chunk: Buffer) => {
    output(chunk.toString())
  },
  commandOptions: [['--remove-orphans']],
})
