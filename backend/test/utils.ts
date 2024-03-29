import crypto from 'crypto'

export function generateRandomString(len: number) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len)
}
