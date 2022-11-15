const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    ID: {
      type: Number,
      unique: [true, "id must be unique"],
    },
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please enter phone date"],
    },
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnose",
      },
    ],
    blood: {
      type: String,
      required: [true, "Please enter blood"],
    },
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", schema);
