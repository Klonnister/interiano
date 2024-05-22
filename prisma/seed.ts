import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: await bcrypt.hash('admin1*', 10),
      image: '/profile-imgs/pocoyo.jpg',
      role: 'admin',
    },
  });

  await prisma.category.createMany({
    data: [
      { name: 'Shampoos' },
      { name: 'Acondicionadores' },
      { name: 'Crema para peinar' },
      { name: 'Crema corporal' },
      { name: 'Desodorantes' },
    ],
  });

  await prisma.trademark.createMany({
    data: [
      {
        name: 'Garnier Fructis',
        image: '/trademark-imgs/1.png',
      },
      {
        name: 'Pantene',
        image: '/trademark-imgs/2.png',
      },
      {
        name: 'Head & Shoulders',
        image: null,
      },
      {
        name: 'Dove',
        image: null,
      },
      {
        name: 'Herbal Essences',
        image: '/trademark-imgs/5.jpg',
      },
      {
        name: 'Rexona',
        image: '/trademark-imgs/6.png',
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        category_id: 1,
        trademark_id: 2,
        title: 'Shampoo Control Caída, Bambú Nutre y Crece',
        image: '/product-imgs/product1.webp',
        size: '400ml',
        description:
          'El mejor shampoo para la caída de cabello, nutre desde raíz a puntas y ayuda al fortalecimiento completo del cabello',
        stock: 1,
        price: 65,
        sale: false,
        sale_price: 0,
        applied_price: 65,
        extra_props: {
          linea: 'Pro-V',
        },
        design: 1,
      },
      {
        category_id: 1,
        trademark_id: 1,
        title: 'Shampoo Nutrición Hair Food Aguacate Fórmula vegana',
        image: '/product-imgs/product2.webp',
        size: '300ml',
        description:
          'Nuevo Shampoo Fórmula vegana sin colorantes artificiales, siliconas ni parabenos. Nutre desde la raíz hasta la punta. Ingredientes de origen 98% natural',
        stock: 1,
        price: 55,
        sale: true,
        sale_price: 40,
        applied_price: 40,
        extra_props: {},
        design: 5,
      },
      {
        category_id: 2,
        trademark_id: 3,
        title: 'Acondicionador Dermo suave y manejable. Control Caspa',
        image: '/product-imgs/product3.png',
        size: '300ml',
        description:
          'Acondicionador dermo que suaviza el cabello desde la raíz hasta las puntas.',
        stock: 1,
        price: 60,
        sale: false,
        sale_price: 0,
        applied_price: 60,
        extra_props: {},
        design: 4,
      },
      {
        category_id: 2,
        trademark_id: 2,
        title:
          'Acondicionador Pantene PRO-V Miracles, Colágeno. Nutre y Revitaliza',
        image: '/product-imgs/product4.webp',
        size: '250ml',
        description:
          'Acondicionador que deja el cabello suave y manejable, hecho a base de colágeno, producto que nutre y revitaliza.',
        stock: 1,
        price: 50,
        sale: true,
        sale_price: 42,
        applied_price: 42,
        extra_props: {
          linea: 'Pro-V',
        },
        design: 2,
      },
      {
        category_id: 2,
        trademark_id: 3,
        title:
          'Acondicionador Head & Shoulders. Revitalización y Suavidad, Aceite de Argán.',
        image: '/product-imgs/product5.webp',
        size: '300ml',
        description:
          'Dermo - Acondicionador control caspa para un cabello revitalizado y hermoso. Hidratación y suavidad para el cabello.',
        stock: 3,
        price: 45,
        sale: false,
        sale_price: 0,
        applied_price: 45,
        extra_props: {},
        design: 3,
      },
      {
        category_id: 1,
        trademark_id: 1,
        title: 'Shampoo Reparación Hair Food Coco Reparación.',
        image: '/product-imgs/product6.webp',
        size: '300ml',
        description:
          'Shampoo fórmula vegana Garnier fructis Reparación, para un cabello revitalizdo y fuerte. Sin colorante artificiales ni siliconas o parabenos.',
        stock: 2,
        price: 60,
        sale: false,
        sale_price: 0,
        applied_price: 60,
        extra_props: {
          línea: 'Coco',
        },
        design: 3,
      },
      {
        category_id: 3,
        trademark_id: 1,
        title: 'Crema para peinar Oil Repair 3 Recarga nutritiva.',
        image: '/product-imgs/product7.webp',
        size: '300ml',
        description:
          'Crema para peinar 10 en 1. Nutre profundamente, sella las cutículas, restaura la hidratación, es anti-frizz y resecamiento, suaviza las puntas y reactiva el brillo. Para cabello seco, tieso y opaco.',
        stock: 2,
        price: 45,
        sale: true,
        sale_price: 40,
        applied_price: 40,
        extra_props: {
          componentes: 'Aceite de aguacate, coco y argán',
        },
        design: 3,
      },
      {
        category_id: 4,
        trademark_id: 4,
        title: 'Crema corporal Nourishing Body Care NutriDUO',
        image: '/product-imgs/product8.png',
        size: '300ml',
        description:
          'La crema corporal Dove trae suavidad a tu piel y humecta.',
        stock: 1,
        price: 150,
        sale: false,
        sale_price: 0,
        applied_price: 150,
        extra_props: {
          tipo: 'Piel seca',
        },
        design: 2,
      },
      {
        category_id: 4,
        trademark_id: 4,
        title: 'Crema corporal Body Love Intensiva para piel muy seca',
        image: '/product-imgs/product9.jpg',
        size: '1 Litro',
        description:
          'La crema corporal Dove Intensiva para piel muy seca, humecta y revitaliza tu piel.',
        stock: 1,
        price: 180,
        sale: true,
        sale_price: 160,
        applied_price: 160,
        extra_props: {
          tipo: 'Piel muy seca',
        },
        design: 1,
      },
      {
        category_id: 5,
        trademark_id: 4,
        title: 'Desodorante Dove tono uniforme anti-manchas.',
        image: '/product-imgs/product10.webp',
        size: '45g',
        description:
          'Desodorante que previene y reduce las manchas. Con rosas, aceites esenciales y vitamina E.',
        stock: 2,
        price: 105,
        sale: false,
        sale_price: 0,
        applied_price: 105,
        extra_props: {
          tipo: 'Anti-manchas',
        },
        design: 1,
      },
      {
        category_id: 5,
        trademark_id: 6,
        title: 'Desodorante Rexona clinical Expert.',
        image: '/product-imgs/product11.webp',
        size: '46g',
        description:
          'Desodorante Clinial de barra y crema antitranspirante. Más protección.',
        stock: 0,
        price: 40,
        sale: false,
        sale_price: 0,
        applied_price: 40,
        extra_props: {},
        design: 5,
      },
      {
        category_id: 3,
        trademark_id: 5,
        title: 'Crema para peinar HB Fuerza y Brillo.',
        image: '/product-imgs/product12.webp',
        size: '300ml',
        description:
          'Crema para peinar cabello liso, para dar fuerza y brillo a tu cabello.',
        stock: 1,
        price: 110,
        sale: true,
        sale_price: 100,
        applied_price: 100,
        extra_props: {},
        design: 1,
      },
      {
        category_id: 1,
        trademark_id: 5,
        title: 'Shampoo Argan Oil of Morocco Repara.',
        image: '/product-imgs/product13.webp',
        size: '400ml',
        description:
          'Shampo Herbal Essences bio-renew Argan Oil of Morocco, repara tu cabello.',
        stock: 2,
        price: 135,
        sale: true,
        sale_price: 110,
        applied_price: 110,
        extra_props: {},
        design: 2,
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
