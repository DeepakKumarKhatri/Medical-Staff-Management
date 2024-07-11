const ClinicManager = require("../models/clinic_manager");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");

const signUpClinicManager = async (req, res) => {
  const { firstName, lastName, userId, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClinicManager = new ClinicManager({
      firstName,
      lastName,
      userId,
      password: hashedPassword,
      avatar: "",
      systemAccess: { userRole: "clinic_manager" },
    });

    const clinic_manager = await newClinicManager.save();

    res.status(201).json({
      message: "Clinic Manager registered successfully",
      data: clinic_manager,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).populate({
      path: "patients.patient",
      model: "Patient",
      populate: [{ path: "diseases" }, { path: "submissions" }],
    });
    res.status(200).json({
      doctors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getClinicManagers = async (req, res) => {
  try {
    const clinicManagers = await ClinicManager.find({});
    res.status(201).json({
      clinicManagers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(201).json({
      patients,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patientID = req.body.patientID;
    if (!patientID) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const patient = await Patient.findByIdAndDelete(patientID);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json({
      message: "SUCCESS",
      patient,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctorID = req.body.doctorID;
    if (!doctorID) {
      return res.status(400).json({ error: "Doctor ID is required" });
    }

    const doctor = await Doctor.findByIdAndDelete(doctorID);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json({
      message: "SUCCESS",
      doctor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteClinicManager = async (req, res) => {
  try {
    const clinicManagerID = req.body.clinicManagerID;
    if (!clinicManagerID) {
      return res.status(400).json({ error: "Clinic Manager ID is required" });
    }

    const clinicManager = await ClinicManager.findByIdAndDelete(
      clinicManagerID
    );
    if (!clinicManager) {
      return res.status(404).json({ error: "Clinic Manager not found" });
    }

    res.status(200).json({
      message: "SUCCESS",
      clinicManager,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signUpClinicManager,
  getDoctors,
  getClinicManagers,
  getPatients,
  deletePatient,
  deleteDoctor,
  deleteClinicManager,
};
