var express = require("express");
var router = express.Router();
const clinicManagerController = require("../controllers/clinic_manager");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const roles = require("../lib/roles");

router.post("/register", clinicManagerController.signUpClinicManager);
router.get("/doctors", clinicManagerController.getDoctors);
router.get("/clinic_managers", clinicManagerController.getClinicManagers);
router.get("/patients", clinicManagerController.getPatients);
router.delete("/doctors", clinicManagerController.deleteDoctor);
router.delete("/clinic_managers", clinicManagerController.deleteClinicManager);
router.delete("/patients", clinicManagerController.deletePatient);
router.post("/add_doctor", clinicManagerController.addDoctor);
router.post("/add_patient", clinicManagerController.addPatient);
router.post("/add_manager", clinicManagerController.addClinicManager);
router.patch("/update_profile", clinicManagerController.updateProfile);
router.get("/get_feedback", clinicManagerController.getFeedbacks);

module.exports = router;
