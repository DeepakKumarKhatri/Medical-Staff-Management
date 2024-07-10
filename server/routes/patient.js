var express = require("express");
var router = express.Router();
const patientController = require("../controllers/patient");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const roles = require('../lib/roles');

router.post("/register", patientController.signUpPatient);
router.get("/demo", verifyToken, authorizeRole(roles.PATIENT) ,patientController.demoMethod);

module.exports = router;
