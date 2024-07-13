var express = require("express");
var router = express.Router();
const clinicManagerController = require("../controllers/clinic_manager");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const roles = require("../lib/roles");

router.post(
  "/register",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.signUpClinicManager
);
router.get(
  "/doctors",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.getDoctors
);
router.get(
  "/clinic_managers",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.getClinicManagers
);
router.get(
  "/patients",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.getPatients
);
router.delete(
  "/doctors",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.deleteDoctor
);
router.delete(
  "/clinic_managers",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.deleteClinicManager
);
router.delete(
  "/patients",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.deletePatient
);
router.post(
  "/add_doctor",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.addDoctor
);
router.post(
  "/add_patient",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.addPatient
);
router.post(
  "/add_manager",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.addClinicManager
);
router.patch(
  "/update_profile",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.updateProfile
);
router.get(
  "/get_feedback",
  verifyToken,
  authorizeRole(roles.CLINIC_MANAGER),
  clinicManagerController.getFeedbacks
);

module.exports = router;
