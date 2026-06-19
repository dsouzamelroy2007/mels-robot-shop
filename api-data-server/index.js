const express = require("express");
const { createToken, hashPassword, publicUser, verifyPassword, verifyToken } = require("./src/auth");
const { nextId, readDb, writeDb } = require("./src/db");

const app = express();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:4200";

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).send();
  }

  next();
});
app.use(express.json());

const PORT = process.env.PORT || 8081;

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function requireAuth(req, res, next) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).send({ message: "Authentication required." });
  }

  const db = readDb();
  const user = db.users.find((candidate) => candidate.id === payload.sub);
  if (!user) {
    return res.status(401).send({ message: "User no longer exists." });
  }

  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Admin access required." });
  }

  next();
}

function validateRegistration(user) {
  if (!user.firstName || !user.lastName || !user.email || !user.password) {
    return "First name, last name, email, and password are required.";
  }

  if (!/^\S+@\S+\.\S+$/.test(user.email)) {
    return "A valid email address is required.";
  }

  if (user.password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return "";
}

function productPrice(product) {
  const discountMultiplier = product.discount && product.discount > 0 ? 1 - product.discount : 1;
  return Number((product.price * discountMultiplier).toFixed(2));
}

function buildCart(userId, db) {
  const cartItems = db.carts[userId] || [];
  const items = cartItems
    .map((item) => {
      const product = db.products.find((candidate) => candidate.id === item.productId);
      if (!product) return null;
      return {
        product,
        quantity: item.quantity,
        lineTotal: Number((productPrice(product) * item.quantity).toFixed(2)),
      };
    })
    .filter(Boolean);

  return {
    items,
    total: Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2)),
  };
}

function requireProductPayload(req, res, next) {
  const { name, description, imageName, category, price } = req.body;
  if (!name || !description || !imageName || !category || price === undefined) {
    return res.status(400).send({ message: "Product name, description, imageName, category, and price are required." });
  }

  if (Number(price) < 0) {
    return res.status(400).send({ message: "Product price must be greater than or equal to 0." });
  }

  next();
}

app.get("/api/health", (req, res) => {
  res.send({ ok: true, service: "api-data-server" });
});

app.post("/api/register", (req, res) => {
  const validationError = validateRegistration(req.body);
  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const db = readDb();
  const email = normalizeEmail(req.body.email);
  const existingUser = db.users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).send({ message: "An account already exists for this email." });
  }

  const user = {
    id: nextId("user", db.users),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email,
    passwordHash: hashPassword(req.body.password),
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  db.carts[user.id] = [];
  writeDb(db);

  res.status(201).send({
    user: publicUser(user),
    token: createToken(user),
  });
});

app.post("/api/sign-in", (req, res) => {
  const db = readDb();
  const email = normalizeEmail(req.body.email);
  const user = db.users.find((candidate) => candidate.email === email);

  if (!user || !verifyPassword(req.body.password || "", user.passwordHash)) {
    return res.status(401).send({ message: "Invalid user credentials." });
  }

  res.status(200).send({
    user: publicUser(user),
    token: createToken(user),
  });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.send(publicUser(req.user));
});

app.get("/api/products", (req, res) => {
  const db = readDb();
  const search = String(req.query.search || "").trim().toLowerCase();
  const category = String(req.query.category || "").trim().toLowerCase();

  const products = db.products.filter((product) => {
    const matchesCategory = !category || product.category.toLowerCase() === category;
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  res.send(products);
});

app.get("/api/categories", (req, res) => {
  const db = readDb();
  const categories = [...new Set(db.products.map((product) => product.category))].sort();
  res.send(categories);
});

app.get("/api/products/:id", (req, res) => {
  const db = readDb();
  const product = db.products.find((candidate) => candidate.id === Number(req.params.id));
  if (!product) {
    return res.status(404).send({ message: "Product not found." });
  }

  res.send(product);
});

app.post("/api/products", requireAuth, requireAdmin, requireProductPayload, (req, res) => {
  const db = readDb();
  const product = {
    id: Math.max(...db.products.map((item) => item.id), 0) + 1,
    name: req.body.name.trim(),
    description: req.body.description.trim(),
    imageName: req.body.imageName.trim(),
    category: req.body.category.trim(),
    price: Number(req.body.price),
    discount: Number(req.body.discount || 0),
    stock: Number(req.body.stock || 0),
  };

  db.products.push(product);
  writeDb(db);
  res.status(201).send(product);
});

app.put("/api/products/:id", requireAuth, requireAdmin, requireProductPayload, (req, res) => {
  const db = readDb();
  const index = db.products.findIndex((candidate) => candidate.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).send({ message: "Product not found." });
  }

  const updatedProduct = {
    ...db.products[index],
    name: req.body.name.trim(),
    description: req.body.description.trim(),
    imageName: req.body.imageName.trim(),
    category: req.body.category.trim(),
    price: Number(req.body.price),
    discount: Number(req.body.discount || 0),
    stock: Number(req.body.stock || 0),
  };

  db.products[index] = updatedProduct;
  writeDb(db);
  res.send(updatedProduct);
});

app.delete("/api/products/:id", requireAuth, requireAdmin, (req, res) => {
  const db = readDb();
  const productId = Number(req.params.id);
  const product = db.products.find((candidate) => candidate.id === productId);
  if (!product) {
    return res.status(404).send({ message: "Product not found." });
  }

  db.products = db.products.filter((candidate) => candidate.id !== productId);
  Object.keys(db.carts).forEach((userId) => {
    db.carts[userId] = db.carts[userId].filter((item) => item.productId !== productId);
  });
  writeDb(db);
  res.status(204).send();
});

app.get("/api/cart", requireAuth, (req, res) => {
  const db = readDb();
  res.send(buildCart(req.user.id, db));
});

app.post("/api/cart/items", requireAuth, (req, res) => {
  const productId = Number(req.body.productId);
  const quantity = Math.max(Number(req.body.quantity || 1), 1);
  const db = readDb();
  const product = db.products.find((candidate) => candidate.id === productId);

  if (!product) {
    return res.status(404).send({ message: "Product not found." });
  }

  const cart = db.carts[req.user.id] || [];
  const existingItem = cart.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  db.carts[req.user.id] = cart;
  writeDb(db);
  res.status(201).send(buildCart(req.user.id, db));
});

app.delete("/api/cart/items/:productId", requireAuth, (req, res) => {
  const productId = Number(req.params.productId);
  const db = readDb();
  const cart = db.carts[req.user.id] || [];
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    db.carts[req.user.id] = cart;
  } else {
    db.carts[req.user.id] = cart.filter((item) => item.productId !== productId);
  }

  writeDb(db);
  res.send(buildCart(req.user.id, db));
});

app.delete("/api/cart", requireAuth, (req, res) => {
  const db = readDb();
  db.carts[req.user.id] = [];
  writeDb(db);
  res.status(204).send();
});

app.post("/api/checkout", requireAuth, (req, res) => {
  const db = readDb();
  const cart = buildCart(req.user.id, db);
  const shippingAddress = req.body.shippingAddress || {};

  if (cart.items.length === 0) {
    return res.status(400).send({ message: "Cannot checkout with an empty cart." });
  }

  if (!shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
    return res.status(400).send({ message: "Complete shipping address is required." });
  }

  const order = {
    id: nextId("order", db.orders),
    userId: req.user.id,
    items: cart.items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: productPrice(item.product),
      quantity: item.quantity,
      lineTotal: item.lineTotal,
    })),
    total: cart.total,
    shippingAddress,
    status: "pending",
    paymentStatus: "not_required",
    createdAt: new Date().toISOString(),
  };

  db.orders.push(order);
  db.carts[req.user.id] = [];
  writeDb(db);
  res.status(201).send(order);
});

app.get("/api/orders", requireAuth, (req, res) => {
  const db = readDb();
  const orders = db.orders
    .filter((order) => order.userId === req.user.id || req.user.role === "admin")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  res.send(orders);
});

app.get("/api/orders/:id", requireAuth, (req, res) => {
  const db = readDb();
  const order = db.orders.find((candidate) => candidate.id === req.params.id);
  if (!order || (order.userId !== req.user.id && req.user.role !== "admin")) {
    return res.status(404).send({ message: "Order not found." });
  }

  res.send(order);
});

app.use((req, res) => {
  res.status(404).send({ message: "Route not found." });
});

app.listen(PORT, () => console.log(`API Data Server listening on port ${PORT}!`));
