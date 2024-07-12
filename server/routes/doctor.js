var express = require("express");
var router = express.Router();
const doctorController = require("../controllers/doctor");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const roles = require("../lib/roles");

router.post("/add_patient", doctorController.addPatient);
router.patch("/update_profile", doctorController.updateProfile);

module.exports = router;
