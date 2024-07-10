const Patient = require("../models/patient");
const ClinicManager = require("../models/clinic_manager");
const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateAccessToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.user._id,
      userRole: user.user.systemAccess.userRole,
      userId: user.user.userId,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    let user =
      (await Patient.findOne({ userId })) ||
      (await Doctor.findOne({ userId })) ||
      (await ClinicManager.findOne({ userId }));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const generatedToken = await generateAccessToken({ user: user });

    res.status(200).json({
      message: "User Found",
      data: user,
      accessToken: generatedToken,
      tokenType: "Bearer",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
};
