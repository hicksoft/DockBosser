import bcrypt from 'bcrypt'

const ROUNDS = 10

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, ROUNDS)
}

export function validatePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}
