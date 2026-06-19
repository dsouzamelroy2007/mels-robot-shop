const crypto = require("crypto");

const TOKEN_TTL_SECONDS = 60 * 60 * 8;
const SECRET = process.env.JWT_SECRET || "dev-only-change-this-secret";

function base64UrlEncode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function base64UrlDecode(value) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

function sign(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("base64url");
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 120000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, storedHash] = passwordHash.split(":");
  if (!salt || !storedHash) return false;

  const candidate = hashPassword(password, salt).split(":")[1];
  if (candidate.length !== storedHash.length) return false;

  return crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(storedHash));
}

function createToken(user) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };
  const unsigned = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}`;
  return `${unsigned}.${sign(unsigned)}`;
}

function verifyToken(token) {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return null;

  const unsigned = `${header}.${payload}`;
  const expectedSignature = sign(unsigned);
  if (signature.length !== expectedSignature.length) return null;

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  ) {
    return null;
  }

  try {
    const decoded = base64UrlDecode(payload);
    if (decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch (error) {
    return null;
  }
}

function publicUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

module.exports = {
  createToken,
  hashPassword,
  publicUser,
  verifyPassword,
  verifyToken,
};
