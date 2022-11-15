const asyncHandler = require("../middlewares/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const Doctor = require("../models/doctor.model");
const { signJWT } = require("../utils/jwt");
const { generateID } = require("../utils/generateID");

const signup = asyncHandler(async (req, res, next) => {
  const { email, name, password, info, serverKey } = req.body;

  const SERVER_KEY = process.env.SERVER_KEY || "bmecs";

  if (serverKey != SERVER_KEY) {
    return next(new ErrorHandler("server key is wrong", 401));
  }

  const user = await Doctor.create({
    email,
    name,
    password,
    info,
  });

  const token = signJWT(user._id);

  res.status(201).json({
    token,
  });
});

const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Doctor.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("this user is doesnt exist", 401));
  }

  const isCurrectPassword = await user.comparePassword(password);
  if (!isCurrectPassword) {
    return next(new ErrorHandler("password is wrong", 401));
  }

  const token = signJWT(user._id);

  res.status(201).json({
    token,
  });
});

module.exports = { signup, signin };
