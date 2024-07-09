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
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      unique: true,
    },
    patients: {
      type: [
        {
          patient: {
            type: mongoose.Types.ObjectId,
            ref: "Patient",
          },
        },
      ],
    },
    submissions: [submissionSchema],
    systemAccess: systemAccessSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
