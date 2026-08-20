# Full-Stack E-Commerce & Admin Platform

A modern, full-stack electronics e-commerce web application built with **Next.js 14 (App Router)**, **TypeScript**, **NextAuth**, **Prisma ORM**, **Express**, and **MySQL**. It features an end-to-end shopping experience for customers and a comprehensive administrative dashboard for inventory, category, and order management.

---

## 🚀 Key Features

### 🛍️ Customer Storefront & Shopping Experience
- **Dynamic Product Catalog**: Browse electronics with responsive grid layouts, category filters, real-time search, and price sorting.
- **Product Detail Views**: High-resolution image galleries, specifications, stock availability indicators, and customer reviews.
- **Cart & Wishlist Management**: Global state management powered by Zustand with persistent local storage and instant feedback.
- **Secure Checkout & Order Management**: Multi-step checkout workflow with customer details validation and instant order generation.
- **User Authentication**: Secure credentials-based authentication with NextAuth.js, bcrypt password hashing, and session management.

### 🛠️ Administrative Dashboard
- **Product Management**: Create, update, view, and delete products with image upload handling and stock tracking.
- **Category Hierarchy**: Organize inventory with unique slugs, dynamic category mapping, and filtering.
- **Order Tracking & Fulfillment**: Monitor customer orders, update statuses (pending, processing, shipped, delivered), and review order items.
- **User Administration**: Role-based access control (Admin / Customer) with user record management.

---

## 🏗️ Architecture & System Design

```mermaid
flowchart TD
    subgraph Client["Client Tier (Browser)"]
        UI["Next.js 14 Frontend\n(React 18, Tailwind CSS, DaisyUI)"]
        State["Client State\n(Zustand Cart / Wishlist)"]
    end

    subgraph AppServer["Application Tier"]
        Auth["NextAuth.js\n(Credentials Provider & Session Guard)"]
        NextAPI["Next.js Route Handlers\n(Auth & Server Components)"]
        ExpressAPI["Express API Service\n(Commerce Operations on Port 3001)"]
    end

    subgraph DataLayer["Persistence Tier"]
        Prisma["Prisma ORM"]
        MySQL[("MySQL Database\n(Users, Products, Orders, Categories)")]
    end

    UI --> Auth
    UI --> NextAPI
    UI --> ExpressAPI
    Auth --> Prisma
    NextAPI --> Prisma
    ExpressAPI --> Prisma
    Prisma --> MySQL
```

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [Next.js 14](https://nextjs.org/) (App Router), [React 18](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) & [JavaScript](https://developer.mozilla.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/), [Headless UI](https://headlessui.com/), [Flowbite](https://flowbite-react.com/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Backend & APIs** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), Next.js API Routes |
| **ORM & Database** | [Prisma ORM](https://www.prisma.io/), [MySQL](https://www.mysql.com/) |
| **Validation** | [Zod](https://zod.dev/) |

---

## 📁 Repository Structure

```text
├── app/                  # Next.js 14 App Router pages, layouts, and route handlers
│   ├── (dashboard)/      # Admin dashboard pages (products, categories, orders, users)
│   ├── api/              # NextAuth and backend API endpoints
│   ├── cart/             # Shopping cart page
│   ├── checkout/         # Multi-step checkout flow
│   ├── product/          # Product detail and listing pages
│   └── wishlist/         # Saved items wishlist page
├── components/           # Reusable UI components (Navbar, Footer, Hero, ProductCard, etc.)
├── helpers/              # Utility helpers and API fetch wrappers
├── lib/                  # Library configurations and helpers
├── prisma/               # Prisma schema and migrations for root app
├── public/               # Static assets and product images
├── server/               # Express backend API service
│   ├── controllers/      # Route controllers for products, categories, orders
│   ├── prisma/           # Prisma schema, migrations, and database seed script
│   ├── routes/           # Express router endpoints
│   └── app.js            # Express application entry point
├── utils/                # Database singleton, auth schemas, and seed helpers
└── tailwind.config.ts    # Tailwind CSS styling configuration
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **MySQL Server**: running locally or hosted remotely

### 1. Clone the Repository
```bash
git clone https://github.com/ubaidullah-ctrl/full-stack-ecommerce-platform.git
cd full-stack-ecommerce-platform
```

### 2. Install Dependencies
Install dependencies for both the frontend application and backend server:
```bash
npm install
cd server
npm install
cd ..
```

### 3. Configure Environment Variables
Create `.env` files for both the root application and the Express server:

**Root Application (`.env`):**
```env
DATABASE_URL="mysql://username:password@localhost:3306/ecommerce_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-jwt-key"
```

**Express Server (`server/.env`):**
```env
DATABASE_URL="mysql://username:password@localhost:3306/ecommerce_db"
PORT=3001
```

### 4. Database Setup & Seeding
Generate the Prisma clients and push the schema to your MySQL instance:
```bash
# Push schema and generate Prisma client
npx prisma generate
npx prisma db push

# Generate Prisma client for the Express server
cd server
npx prisma generate
npx prisma db push

# (Optional) Seed the database with demo products, categories, and users
node prisma/seed.js
cd ..
```

### 5. Run the Application
Start the Express API service in one terminal:
```bash
cd server
node app.js
```

Start the Next.js development server in a second terminal:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The Express API service will be active at [http://localhost:3001](http://localhost:3001).

---

## 🔒 Security & Best Practices
- **Protected Routes**: NextAuth middleware guards administrative dashboards and user-specific order histories.
- **Password Security**: Passwords are salted and hashed with `bcryptjs` before persistence.
- **Environment Isolation**: Database credentials and JWT secrets are managed via server-side environment variables.

---

## 👨‍💻 Author

**Ubaid Ullah**
- **Portfolio**: [Portfolio Website](https://my-portfolio-website-plum-theta.vercel.app/)
- **GitHub**: [@ubaidullah-ctrl](https://github.com/ubaidullah-ctrl)
- **LinkedIn**: [ubaid-ullah-](https://www.linkedin.com/in/ubaid-ullah-/)
- **Email**: [ubaidullah3048@gmail.com](mailto:ubaidullah3048@gmail.com)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
