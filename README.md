# Mel's Robot Shop

A modern e-commerce application for purchasing robot parts and components. Built with Angular 16 and a Node.js backend API server.

## 📋 Overview

Mel's Robot Shop is a full-stack web application that allows users to browse a catalog of robot parts, add items to their cart, and complete purchases. The application features a responsive user interface, product details pages, shopping cart management, and user account functionality.

## ✨ Features

- **Product Catalog** - Browse and search through a curated selection of robot parts
- **Product Details** - View detailed information, specifications, and pricing for individual products
- **Shopping Cart** - Add, remove, and manage items in your cart with real-time updates
- **User Accounts** - Create and manage user profiles and purchase history
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
node index.js
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

This project is part of a personal learning exercise from Udemy courses.

---

For more information about Angular CLI, visit the [official documentation](https://angular.io/cli).
