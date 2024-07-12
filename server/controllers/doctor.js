const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");

const addPatient = async (req, res) => {
  try {
    const patientData = req.body;
    console.log(patientData);

    if (!patientData) {
      return res.status(400).json({ error: "No data received from client" });
    }

    const existingPatient = await Patient.findOne({ userId: patientData.id });
    if (existingPatient) {
      return res.status(409).json({ error: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(patientData.pass, 10);

    const doctor = await Doctor.findById(patientData.diagnosedBy.doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const diseases = patientData.diseases.map((disease) => ({
      title: disease.title,
      description: disease.description,
      diagnosedBy: patientData.diagnosedBy.doctorName,
      instructions: {
        instructions: disease.instruction.split("\n"),
        additionalNotes: patientData.notes || "",
      },
      status: "Start-Treatment",
    }));

    const data = {
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      userId: patientData.id,
      password: hashedPassword,
      avatar: patientData.profileImage,
      gender: patientData.gender,
      contact: patientData.id,
      submissions: [],
      systemAccess: { userRole: "patient" },
      diseases: diseases,
    };

    const patient = await Patient.create(data);
    if (!patient) {
      return res
        .status(404)
        .json({ error: "Error occurred while creating patient" });
    }

    if (patient._id) {
      doctor.patients.push({ patient: patient._id });
      await doctor.save();
    } else {
      return res.status(500).json({ error: "Patient ID is not valid" });
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

const getPatients = async (req, res) => {
  try {
    const { doctorId } = req.body;
    if (!doctorId) {
      return res
        .status(400)
        .json({ error: "Doctor Id not received from the client" });
    }

    const doctor = await Doctor.findById(doctorId).populate({
      path: "patients.patient",
      model: "Patient",
    });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json({
      message: "SUCCESS",
      patients: doctor.patients.map((p) => p.patient),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { patientId, status } = req.body;

    if (!patientId || !status) {
      return res
        .status(400)
        .json({ error: "Patient ID and status are required" });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    patient.status = status;
    await patient.save();

    res.status(200).json({ message: "SUCCESS", patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const doctorData = req.body;
    if (!doctorData) {
      return res.status(400).json({ error: "No data received from client" });
    }

    const {
      firstName,
      lastName,
      id,
      profileImage,
      originalID,
      department,
      yearsOfExperience,
      gender,
    } = doctorData;

    const doctor = await Doctor.findOneAndUpdate(
      { userId: originalID },
      {
        firstName,
        lastName,
        avatar: profileImage,
        userId: id,
        department,
        yearsOfExperience,
        gender,
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ error: "Error occurred" });
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

const addSubmission = async (req, res) => {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(400).json({ error: "No data received from client" });
    }

    const { userId, subject, message, ofType, stars } = formData;

    const doctor = await Doctor.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          submissions: {
            subject,
            message,
            stars,
            ofType,
          },
        },
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json({
      message: "Submission added successfully",
      doctor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addPatient,
  getPatients,
  changeStatus,
  updateProfile,
  addSubmission,
};
