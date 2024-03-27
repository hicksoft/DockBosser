import { v2 as compose } from 'docker-compose'

type Output = (output: string) => void

export function composeUp(filename: string, output: Output) {
  return compose.upAll(options(filename, output))
}

export function composeDown(filename: string, output: Output) {
  return compose.downAll(options(filename, output))
}

const options = (filename: string, output: Output) => ({
  cwd: process.env['COMPOSE_DIR'],
  config: filename,
  callback: (chunk: Buffer) => {
    output(chunk.toString())
  },
  commandOptions: [['--remove-orphans']],
})
