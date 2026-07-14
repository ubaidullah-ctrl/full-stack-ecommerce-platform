const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.wishlist.deleteMany();
  await prisma.customer_order_product.deleteMany();
  await prisma.customer_order.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Laptops",
        slug: "laptops"
      }
    }),
    prisma.category.create({
      data: {
        id: "2",
        name: "Headphones",
        slug: "headphones"
      }
    }),
    prisma.category.create({
      data: {
        id: "3",
        name: "Cameras",
        slug: "cameras"
      }
    })
  ]);

  // Create products
  const products = await Promise.all([
    // Laptops
    prisma.product.create({
      data: {
        title: "MacBook Pro 16",
        slug: "macbook-pro-16",
        mainImage: "laptop 1.webp",
        price: 1999,
        rating: 5,
        description: "Latest MacBook Pro with M1 chip",
        manufacturer: "Apple",
        inStock: 10,
        categoryId: categories[0].id
      }
    }),
    prisma.product.create({
      data: {
        title: "Dell XPS 15",
        slug: "dell-xps-15",
        mainImage: "laptop 2.webp",
        price: 1499,
        rating: 4,
        description: "Premium Windows laptop",
        manufacturer: "Dell",
        inStock: 5,
        categoryId: categories[0].id
      }
    }),
    // Headphones
    prisma.product.create({
      data: {
        title: "Sony WH-1000XM4",
        slug: "sony-wh-1000xm4",
        mainImage: "headphones 1.png",
        price: 349,
        rating: 5,
        description: "Premium noise-cancelling headphones",
        manufacturer: "Sony",
        inStock: 15,
        categoryId: categories[1].id
      }
    }),
    // Cameras
    prisma.product.create({
      data: {
        title: "Canon EOS R5",
        slug: "canon-eos-r5",
        mainImage: "camera 1.png",
        price: 3899,
        rating: 5,
        description: "Professional mirrorless camera",
        manufacturer: "Canon",
        inStock: 3,
        categoryId: categories[2].id
      }
    })
  ]);

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 5);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin"
      }
    }),
    prisma.user.create({
      data: {
        email: "user@example.com",
        password: hashedPassword,
        role: "user"
      }
    })
  ]);

  // Add some product images
  await Promise.all([
    prisma.image.create({
      data: {
        productID: products[0].id,
        image: "laptop 1.webp"
      }
    }),
    prisma.image.create({
      data: {
        productID: products[0].id,
        image: "laptop 2.webp"
      }
    })
  ]);

  // Create a sample order
  const order = await prisma.customer_order.create({
    data: {
      name: "John",
      lastname: "Doe",
      phone: "1234567890",
      email: "john@example.com",
      company: "Example Corp",
      adress: "123 Main St",
      apartment: "Apt 4B",
      city: "New York",
      country: "USA",
      postalCode: "10001",
      status: "pending",
      orderNotice: "Please deliver during business hours",
      total: products[0].price
    }
  });

  // Add products to the order
  await prisma.customer_order_product.create({
    data: {
      customerOrder: {
        connect: { id: order.id }
      },
      product: {
        connect: { id: products[0].id }
      },
      quantity: 1
    }
  });

  // Add item to wishlist
  await prisma.wishlist.create({
    data: {
      userId: users[1].id,
      productId: products[0].id
    }
  });

  console.log('Sample data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
