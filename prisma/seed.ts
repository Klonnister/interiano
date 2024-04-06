import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: await bcrypt.hash('admin1*', 10),
      role: 'admin',
    },
  });

  await prisma.category.createMany({
    data: [{ name: 'Shampoos' }, { name: 'Acondicionadores' }],
  });

  await prisma.trademark.createMany({
    data: [
      {
        name: 'Garnier Fructis',
        image: '1.png',
      },
      {
        name: 'Pantene',
        image: '2.png',
      },
      {
        name: 'Head & Shoulders',
        image: null,
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        category_id: 1,
        trademark_id: 2,
        title: 'Shampoo Control Caída, Bambú Nutre y Crece',
        image: 'product1.webp',
        size: '400ml',
        description:
          'El mejor shampoo para la caída de cabello, nutre desde raíz a puntas y ayuda al fortalecimiento completo del cabello',
        stock: 1,
        price: 65,
        sale: false,
        sale_price: 0,
        extra_props: {
          linea: 'Pro-V',
        },
        design: 1,
      },
      {
        category_id: 1,
        trademark_id: 1,
        title: 'Shampoo Nutrición Hair Food Aguacate Fórmula vegana',
        image: 'product2.webp',
        size: '300ml',
        description:
          'Nuevo Shampoo Fórmula vegana sin colorantes artificiales, siliconas ni parabenos. Nutre desde la raíz hasta la punta. Ingredientes de origen 98% natural',
        stock: 1,
        price: 55,
        sale: true,
        sale_price: 40,
        extra_props: {},
        design: 1,
      },
      {
        category_id: 2,
        trademark_id: 3,
        title: 'Acondicionador Dermo suave y manejable. Control Caspa',
        image: 'product3.png',
        size: '300ml',
        description:
          'Acondicionador dermo que suaviza el cabello desde la raíz hasta las puntas.',
        stock: 1,
        price: 60,
        sale: false,
        sale_price: 0,
        extra_props: {},
        design: 1,
      },
    ],
  });
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
