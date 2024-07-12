var express = require("express");
var router = express.Router();
const doctorController = require("../controllers/doctor");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const roles = require("../lib/roles");

router.post("/add_patient", doctorController.addPatient);
router.post("/get_patients", doctorController.getPatients);
router.post("/change_status", doctorController.changeStatus);


module.exports = router;
