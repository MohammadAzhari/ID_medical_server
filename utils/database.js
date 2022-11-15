const mongoose = require("mongoose");

const CONNECTION_STRING =
  process.env.CONNECTION_STRING || "mongodb://localhost/ID-Medical-Number";

const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = {connectDB}
