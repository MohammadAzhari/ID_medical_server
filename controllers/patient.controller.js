const asyncHandler = require("../middlewares/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const Patient = require("../models/patient.model");
const Diagnose = require("../models/diagnose.model");
const { generateID } = require("../utils/generateID");
const { default: mongoose } = require("mongoose");

const addPatient = asyncHandler(async (req, res, next) => {
  const { name, date, blood, address } = req.body;

  if (!"year" in date || !"month" in date || !"day" in date)
    return next(new ErrorHandler("enter valid date", 400));

  const dateOfBirth = new Date(date.year, date.month, date.day);

  let ID = generateID();

  while (true) {
    const isNotUniqueID = await Patient.findOne({ ID });
    if (!isNotUniqueID) break;
    ID++;
  }
  const patient = await Patient.create({
    name,
    dateOfBirth,
    blood,
    address,
    ID,
  });

  res.status(200).json({
    patient,
  });
});

const addDiagnose = asyncHandler(async (req, res, next) => {
  const { text, treatment, patientID, hospital, chronic } = req.body;

  if (!text || !treatment || !patientID)
    return next(new ErrorHandler("Please fill all the fields", 400));

  const patient = await Patient.findOne({ ID: patientID });
  if (!patient) {
    return next("wrong patient id", 400);
  }

  const diagnose = await Diagnose.create({
    doctor: res.locals.user,
    text,
    patient,
    treatment,
    hospital,
    chronic,
  });

  await Patient.findByIdAndUpdate(patient._id, {
    $push: { history: diagnose },
  });

  res.status(200).json({
    diagnose,
  });
});

const getPatient = asyncHandler(async (req, res, next) => {
  const { id: ID } = req.params;
  if (!ID) {
    return next(new ErrorHandler("param is uncorrect", 400));
  }

  const patient = await Patient.findOne({ ID })
    .populate("history")
    .populate({
      path: "history",
      populate: {
        path: "doctor",
        select: "-password",
      },
    });

  if (!patient) {
    return next(new ErrorHandler("wrong id", 404));
  }

  res.status(200).json({
    patient,
  });
});

const deleteDiagnose = asyncHandler(async (req, res, next) => {
  const { patientID, diagnose } = req.params;

  if (!patientID || !diagnose || diagnose.length < 24) {
    return next(new ErrorHandler("param is uncorrect", 400));
  }

  const patient = await Patient.findOne({ ID: patientID });

  const index = patient.history.findIndex((i) => i == diagnose);

  if (index === -1) {
    return next(new ErrorHandler("diagnose is uncorrect", 404));
  }

  patient.history.splice(index, 1);

  await patient.save();

  res.status(200).json({
    patient,
  });
});

const doneDiagnose = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new ErrorHandler("the param is uncorrect", 401);
  }

  const diagnose = await Diagnose.findByIdAndUpdate(
    id,
    { done: true },
    { new: true }
  );
  res.status(201).json({
    diagnose,
  });
});

module.exports = {
  addPatient,
  addDiagnose,
  getPatient,
  deleteDiagnose,
  doneDiagnose,
};
