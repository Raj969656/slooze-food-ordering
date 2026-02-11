import { PrismaClient, Role, Country } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'nick@fury.com',
        password,
        role: Role.ADMIN,
        country: Country.INDIA,
      },
      {
        email: 'marvel@hero.com',
        password,
        role: Role.MANAGER,
        country: Country.INDIA,
      },
      {
        email: 'cap@america.com',
        password,
        role: Role.MANAGER,
        country: Country.AMERICA,
      },
      {
        email: 'thanos@titan.com',
        password,
        role: Role.MEMBER,
        country: Country.INDIA,
      },
      {
        email: 'thor@asgard.com',
        password,
        role: Role.MEMBER,
        country: Country.INDIA,
      },
      {
        email: 'travis@usa.com',
        password,
        role: Role.MEMBER,
        country: Country.AMERICA,
      },
    ],
  });

  await prisma.restaurant.createMany({
    data: [
      {
        name: 'Delhi Bites',
        country: Country.INDIA,
      },
      {
        name: 'NYC Grill',
        country: Country.AMERICA,
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
