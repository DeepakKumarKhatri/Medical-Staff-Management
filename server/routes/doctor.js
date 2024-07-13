var express = require("express");
var router = express.Router();
const doctorController = require("../controllers/doctor");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const roles = require("../lib/roles");

router.post(
  "/add_patient",
  verifyToken,
  authorizeRole(roles.DOCTOR),
  doctorController.addPatient
);
router.post(
  "/get_patients",
  verifyToken,
  authorizeRole(roles.DOCTOR),
  doctorController.getPatients
);
router.post(
  "/change_status",
  verifyToken,
  authorizeRole(roles.DOCTOR),
  doctorController.changeStatus
);
router.patch(
  "/update_profile",
  verifyToken,
  authorizeRole(roles.DOCTOR),
  doctorController.updateProfile
);
router.patch(
  "/add_submission",
  verifyToken,
  authorizeRole(roles.DOCTOR),
  doctorController.addSubmission
);

module.exports = router;
