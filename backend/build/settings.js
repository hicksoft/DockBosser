import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const DEFAULTS = {
    admin_user: 'admin',
    admin_pass: 'admin',
};
export function initDb() {
    for (const name in DEFAULTS) {
        const initialized = prisma.setting.findUnique({ where: { name } });
        if (!initialized)
            prisma.setting.create({ data: { name, value: DEFAULTS[name] } });
    }
}
//# sourceMappingURL=settings.js.map