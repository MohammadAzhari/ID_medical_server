const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "the email is requird"],
      unique: [true, "this email is used"],
    },
    name: {
      type: String,
      required: [true, "the name is requird"],
    },
    password: {
      type: String,
      required: [true, "the password is requird"],
      minlength: [6, "the password must be 6 or more chars"],
    },
    info: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

schema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Doctor", schema);
