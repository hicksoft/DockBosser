import bcrypt from 'bcrypt'
import { getSetting } from './setting'

const ROUNDS = 10

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, ROUNDS)
}

export async function validateLogin(username: string, password: string) {
  const usernameSetting = await getSetting('admin_user')
  if (usernameSetting != username) return false

  const passHash = await getSetting('admin_pass')
  return bcrypt.compareSync(password, passHash)
}
