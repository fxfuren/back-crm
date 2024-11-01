import { hash } from 'argon2';
import { PrismaClient } from '../../prisma/__generated__';

const prismaService = new PrismaClient();

async function main() {
  const adminExists = await prismaService.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!adminExists) {
    await prismaService.user.create({
      data: {
        email: 'admin@example.com',
        password: await hash('(Admin123)'),
        displayName: 'Admin',
        role: 'ADMIN',
        isVerified: true,
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  const warehouseExists = await prismaService.warehouse.findFirst();

  if (!warehouseExists) {
    await prismaService.warehouse.create({
      data: {
        name: 'Склад 1',
      },
    });
    console.log('Warehouse created');
  } else {
    console.log('Warehouse already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaService.$disconnect();
  });
