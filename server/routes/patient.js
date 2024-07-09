var express = require("express");
var router = express.Router();
const patientController = require("../controllers/patient");

router.post("/register", patientController.signUpPatient);

module.exports = router;
