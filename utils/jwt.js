const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "thisismyjwtsecret";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1y";

const signJWT = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

module.exports = { signJWT, JWT_SECRET };
