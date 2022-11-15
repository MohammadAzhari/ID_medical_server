const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");
const ErrorHandler = require("../utils/errorHandler");
const { JWT_SECRET } = require("../utils/jwt");
const asyncHandler = require("./asyncHandler");

const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    return next(new ErrorHandler("user is not authorized", 401));
  }

  const { id } = await jwt.verify(token.split(" ")[1], JWT_SECRET);

  const doctor = await Doctor.findById(id);

  res.locals.user = doctor;

  next();
});

module.exports = { isAuth };
