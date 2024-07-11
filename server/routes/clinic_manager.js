var express = require("express");
var router = express.Router();
const clinicManagerController = require("../controllers/clinic_manager");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const roles = require("../lib/roles");

router.post("/register", clinicManagerController.signUpClinicManager);
router.get("/doctors", clinicManagerController.getDoctors);
router.get("/clinic_managers", clinicManagerController.getClinicManagers);
router.get("/patients", clinicManagerController.getPatients);

module.exports = router;
