import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

async function main() {
  const prismaService = new PrismaService();

  const adminExists = await prismaService.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!adminExists) {
    await prismaService.user.create({
      data: {
        email: 'admin@example.com',
        password: await hash('admin'),
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

const prismaService = new PrismaService();

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaService.$disconnect();
  });
