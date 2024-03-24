import { execSync } from 'child_process'

export function reset() {
  execSync('npx prisma migrate reset --force')
}
