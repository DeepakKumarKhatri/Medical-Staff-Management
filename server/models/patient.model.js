const mongoose = require("mongoose");

const instructionsSchema = new mongoose.Schema(
  {
    instructions: [{ type: String, required: true }],
    additionalNotes: { type: String },
  },
  { timestamps: true }
);

const diseaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    diagnosedBy: {
      type: String,
      required: true,
    },
    instructions: instructionsSchema,
    status: {
      type: String,
      required: true,
      enum: ["Start-Treatment", "Mid-Treatment", "End-Treatment"],
    },
  },
  { timestamps: true }
);

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

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      unique: true,
    },
    diseases: [diseaseSchema],
    submissions: [submissionSchema],
    systemAccess: systemAccessSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
