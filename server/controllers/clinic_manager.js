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
      path: 'patients.patient',
      model: 'Patient', 
      populate: [
        { path: 'diseases' }, 
        { path: 'submissions' },
      ],
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

module.exports = {
  signUpClinicManager,
  getDoctors,
  getClinicManagers,
  getPatients,
};
