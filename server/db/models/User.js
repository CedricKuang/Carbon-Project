const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: [true, "can't be blank"], unique: true },
    firstName: { type: String },
    lastName: { type: String },
    google: {
      id: { type: String, required: [true, "can't be blank"], unique: true },
    },
    projectsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    templatesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
    admin: {
      type: Boolean,
      default: false,
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", default: null },
  },
  { timestamps: true, strict: false }
);

let User = mongoose.model("User", userSchema);

module.exports = User;
