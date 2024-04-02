import bcrypt from 'bcrypt'

const ROUNDS = 10

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, ROUNDS)
}

export async function validateHash(password: string, passhash: string) {
  return bcrypt.compareSync(password, passhash)
}
