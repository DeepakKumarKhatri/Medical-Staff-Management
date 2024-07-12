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
  userRole: {
    type: String,
    required: true,
    enum: ["patient", "doctor", "clinic_manager"],
  },
});

const submissionSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    message: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5 },
    ofType: {
      type: String,
      required: true,
      enum: ["complaint", "feedback"],
    },
  },
  { timestamps: true }
);

const doctorSchema = new mongoose.Schema(
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
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    yearsOfExperience: {
      type: String,
      default: 0,
    },
    department: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      unique: true,
      default: "",
    },
    patients: [
      {
        patient: {
          type: mongoose.Types.ObjectId,
          ref: "Patient",
        },
      },
    ],
    submissions: {
      type: [submissionSchema],
      default: [],
    },
    systemAccess: {
      type: systemAccessSchema,
      default: () => ({ userRole: "doctor" }),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
