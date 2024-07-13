var express = require("express");
var router = express.Router();
const patientController = require("../controllers/patient");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const roles = require("../lib/roles");

router.post("/register", patientController.signUpPatient);
router.patch(
  "/add_submission",
  verifyToken,
  authorizeRole(roles.PATIENT),
  patientController.addSubmission
);

module.exports = router;
