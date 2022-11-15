const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const { getDoctor } = require("../controllers/doctor.controller");
const {
  addPatient,
  addDiagnose,
  getPatient,
  deleteDiagnose,
  doneDiagnose,
} = require("../controllers/patient.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/patient", isAuth, addPatient);
router.patch("/patient", isAuth, addDiagnose);
router.get("/patient/:id", getPatient);
router.delete("/patient/:patientID/:diagnose", isAuth, deleteDiagnose);
router.get("/doctor/:id", getDoctor);
router.patch("/diagnose/:id", isAuth, doneDiagnose);

module.exports = router;
