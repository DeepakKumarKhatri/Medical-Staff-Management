const ClinicManager = require("../models/clinic_manager");
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

    res
      .status(201)
      .json({
        message: "Clinic Manager registered successfully",
        data: clinic_manager,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signUpClinicManager,
};
