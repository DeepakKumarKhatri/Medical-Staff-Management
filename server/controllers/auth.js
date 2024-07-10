const Patient = require("../models/patient");
const ClinicManager = require("../models/clinic_manager");
const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    let user = await Patient.findOne({ userId });
    if (!user) {
      user = await Doctor.findOne({ userId });
    }
    if (!user) {
      user = await ClinicManager.findOne({ userId });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "User Found", data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
};
