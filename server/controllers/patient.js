const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");

const signUpPatient = async (req, res) => {
  const { firstName, lastName, userId, password } = req.body;
  console.log(firstName, lastName, userId, password);

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
      status: "",
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

const demoMethod = async (req, res) => {
  res.end("I'm inside Demo Method");
};

module.exports = {
  signUpPatient,
  demoMethod,
};
