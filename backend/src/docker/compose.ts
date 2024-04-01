import { v2 as compose } from 'docker-compose'

type Output = (output: string) => void

export function composeUp(dir: string, output: Output) {
  return compose.upAll(options(dir, output))
}

export function composeDown(dir: string, output: Output) {
  return compose.downAll(options(dir, output))
}

const options = (dir: string, output: Output) => ({
  cwd: dir,
  callback: (chunk: Buffer) => {
    output(chunk.toString())
  },
  commandOptions: [['--remove-orphans']],
})
