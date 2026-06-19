const fs = require("fs");
const path = require("path");
const { hashPassword } = require("./auth");
const seedProducts = require("./seed-products");

const dbPath = path.join(__dirname, "..", "data", "db.json");

function defaultData() {
  return {
    users: [
      {
        id: "user_1",
        firstName: "Melroy",
        lastName: "Dsouza",
        email: "mel@gmail.com",
        passwordHash: hashPassword("mysecret"),
        role: "customer",
        createdAt: new Date().toISOString(),
      },
      {
        id: "user_2",
        firstName: "Server",
        lastName: "Admin",
        email: "admin@gmail.com",
        passwordHash: hashPassword("secret"),
        role: "admin",
        createdAt: new Date().toISOString(),
      },
    ],
    products: seedProducts,
    carts: {},
    orders: [],
  };
}

function ensureDb() {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(defaultData(), null, 2));
  }
}

function readDb() {
  ensureDb();
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function nextId(prefix, collection) {
  return `${prefix}_${Date.now()}_${collection.length + 1}`;
}

module.exports = {
  nextId,
  readDb,
  writeDb,
};
