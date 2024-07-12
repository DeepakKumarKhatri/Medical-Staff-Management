const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");

const addPatient = async (req, res) => {
  try {
    const patientData = req.body;
    if (!patientData) {
      return res.status(400).json({ error: "No data received from client" });
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
      return res.status(404).json({ error: "Error occurred" });
    }

    doctor.patients.push({ patient: patient._id });
    await doctor.save();

    res.status(200).json({
      message: "SUCCESS",
      patient,
    });
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

    const { firstName, lastName, id, profileImage, originalID } = doctorData;

    const doctor = await Doctor.findOneAndUpdate(
      { userId: originalID },
      {
        firstName,
        lastName,
        avatar: profileImage,
        userId: id,
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ error: "Error occurred" });
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
  addPatient,
  updateProfile,
};
