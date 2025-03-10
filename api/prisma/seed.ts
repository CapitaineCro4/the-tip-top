import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Password } from '../src/utils/Password';

async function main() {
  const password = await Password.crypt('123456');

  await prisma.user.upsert({
    where: { email: 'toto@thetiptop.com' },
    update: {},
    create: {
      email: 'toto@thetiptop.com',
      firstName: 'Toto',
      lastName: 'Toto',
      password,
      gender: 'MALE',
      birthDate: new Date('2000-01-01'),
    },
  });

  const gains = [
    {
      name: 'Infuseur à thé',
      value: 9,
      probability: 6,
    },
    {
      name: 'Boîte de 100g thé détox',
      value: 15,
      probability: 2,
    },
    {
      name: 'Boîte de 100g thé signature',
      value: 20,
      probability: 1,
    },
    {
      name: 'Coffret découverte 39€',
      value: 39,
      probability: 6,
    },
    {
      name: 'Coffret découverte 69€',
      value: 69,
      probability: 4,
    }
  ];

  for (const gain of gains) {
    await prisma.gain.upsert({
      where: { id: await getGainId(gain.name) },
      update: {},
      create: {
        name: gain.name,
        value: gain.value,
        probability: gain.probability,
      },
    });
  }
}

async function getGainId(name: string) {
  const existing = await prisma.gain.findFirst({ where: { name } });
  return existing?.id ?? 0;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
