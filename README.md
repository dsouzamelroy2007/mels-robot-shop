# Mel's Robot Shop

A modern e-commerce application for purchasing robot parts and components. Built with Angular 16 and a Node.js backend API server.

## 📋 Overview

Mel's Robot Shop is a full-stack web application that allows users to browse a catalog of robot parts, add items to their cart, and complete purchases. The application features a responsive user interface, product details pages, shopping cart management, and user account functionality.

## ✨ Features

- **Product Catalog** - Browse and search through a curated selection of robot parts
- **Product Details** - View detailed information, specifications, and pricing for individual products
- **Shopping Cart** - Add, remove, and manage items in your cart with real-time updates
- **User Accounts** - Register, sign in, and use protected storefront routes
- **Persistent Carts** - Save cart contents per authenticated user
- **Checkout & Orders** - Store checkout details and view order history
- **Product API Management** - Query products and use admin-only create/update/delete endpoints
- **Responsive Design** - Fully functional on desktop, tablet, and mobile devices
- **API Integration** - Seamless integration with a Node.js backend for data management

## 🏗️ Project Structure

```
mels-robot-shop/
├── src/
│   ├── app/
│   │   ├── cart/               # Shopping cart functionality
│   │   ├── catalog/            # Product catalog and listing
│   │   ├── home/               # Home page component
│   │   ├── product-details/    # Individual product view
│   │   ├── site-header/        # Navigation header
│   │   ├── user/               # User account management
│   │   ├── app.module.ts       # Main application module
│   │   └── app-routing.module.ts # Route configuration
│   ├── assets/                 # Static assets (images, styles)
│   └── main.ts                 # Application entry point
├── api-data-server/            # Node.js backend API server
├── cypress/                    # E2E test specifications
├── angular.json                # Angular CLI configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) and npm
- **Angular CLI** version 16.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mels-robot-shop
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend API server dependencies:
```bash
cd api-data-server
npm install
cd ..
```

### Running the Application

#### Start the Development Servers

1. **Start the backend API server** (in a separate terminal):
```bash
cd api-data-server
npm start
```

2. **Start the Angular development server**:
```bash
npm start
```

The application will automatically open at `http://localhost:4200/`. The app will automatically reload if you change any source files.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the development server on `http://localhost:4200/` |
| `npm run build` | Builds the project for production in the `dist/` directory |
| `npm run watch` | Builds and watches for file changes during development |
| `npm test` | Runs unit tests using Karma test runner |
| `npm run e2e` | Opens Cypress for interactive end-to-end testing |
| `npm run e2e:run` | Runs end-to-end tests in headless mode |

## 🧪 Testing

### Unit Tests
```bash
npm test
```
Executes unit tests using [Karma](https://karma-runner.github.io) and Jasmine.

### End-to-End Tests
```bash
npm run e2e
```
Opens [Cypress](https://www.cypress.io/) for interactive E2E testing. Use `npm run e2e:run` for headless testing.

## 🔐 API Features

The API data server persists data to `api-data-server/data/db.json` and supports:

- `POST /api/register` - create a customer account and return an auth token
- `POST /api/sign-in` - sign in and return an auth token
- `GET /api/me` - return the current authenticated user
- `GET /api/products` - list products with optional `search` and `category` query params
- `GET /api/categories` - list product categories
- `GET /api/products/:id` - get one product
- `POST /api/products` - create a product, admin only
- `PUT /api/products/:id` - update a product, admin only
- `DELETE /api/products/:id` - delete a product, admin only
- `GET /api/cart` - get the authenticated user's cart
- `POST /api/cart/items` - add a product to the authenticated user's cart
- `DELETE /api/cart/items/:productId` - remove one quantity from the cart
- `DELETE /api/cart` - clear the cart
- `POST /api/checkout` - store checkout details and create an order
- `GET /api/orders` - list the authenticated user's orders

Payment integration is intentionally not included yet. But the plan is to use stripe or paypal in future

## 🛠️ Development

### Generate New Components
```bash
ng generate component feature-name
```

### Generate Services
```bash
ng generate service service-name
```

### Generate Other Elements
```bash
ng generate directive|pipe|guard|interface|enum|module
```

## 📦 Technologies Used

**Frontend:**
- Angular 16
- TypeScript 5.0
- RxJS 7.8
- Angular Forms & Routing

**Backend:**
- Node.js
- Express (implied from API server)

**Testing:**
- Karma & Jasmine (unit tests)
- Cypress (end-to-end tests)

**Build Tools:**
- Angular CLI 16
- Webpack (via Angular CLI)
- TypeScript compiler

## 📝 Code Structure

- **Components**: Reusable UI components located in individual feature folders
- **Services**: Data and business logic services
- **Routing**: Application navigation configured in `app-routing.module.ts`
- **Styling**: Component-scoped CSS styles in each module

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements or bug fixes.

## 📄 License

This project is part of a personal learning exercise.

---

For more information about Angular CLI, visit the [official documentation](https://angular.io/cli).
