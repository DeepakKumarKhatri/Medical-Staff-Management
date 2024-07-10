const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");

const signUpPatient = async (req, res) => {
  const { firstName, lastName, userId, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({
      firstName,
      lastName,
      userId,
      password: hashedPassword,
      avatar: "",
      gender: "",
      contact: "",
      diseases: [],
      submissions: [],
      systemAccess: { userRole: "patient" },
    });

    const patient = await newPatient.save();

    res
      .status(201)
      .json({ message: "Patient registered successfully", data: patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signUpPatient,
};
