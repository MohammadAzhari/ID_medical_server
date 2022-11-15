const asyncHandler = require("../middlewares/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient.model");
const Diagnose = require("../models/diagnose.model");
const Doctor = require("../models/doctor.model");
const { default: mongoose } = require("mongoose");

const getDoctor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new ErrorHandler("the param is uncorrect", 401);
  }

  const doctor = await Doctor.findById(id);

  if (!doctor) {
    return new ErrorHandler("id is uncorrect", 404);
  }
  const doctorDiagnose = await Diagnose.find({ doctor: id });

  res.status(200).json({
    doctor: doctor,
    numberDiagnose: doctorDiagnose.length,
  });
});

module.exports = { getDoctor };
