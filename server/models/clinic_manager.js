const mongoose = require("mongoose");

const systemAccessSchema = new mongoose.Schema({
  isBlocked: {
    type: Boolean,
    default: false,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
});

const clinicManagerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    systemAccess: systemAccessSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClinicManager", clinicManagerSchema);
