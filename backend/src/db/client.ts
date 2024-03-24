import { PrismaClient } from '@prisma/client'
import { hashPassword } from './auth'

export const prisma = new PrismaClient().$extends({
  query: {
    setting: {
      async $allOperations({ operation, args, query }) {
        if (
          ['create', 'update'].includes(operation) &&
          'data' in args &&
          typeof args.data['value'] === 'string' &&
          args.data['name'] === 'admin_pass'
        ) {
          args.data['value'] = hashPassword(args.data['value'])
        }
        return query(args)
      },
    },
  },
})
