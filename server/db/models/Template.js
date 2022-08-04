const mongoose = require("mongoose");

const templateSchema = mongoose.Schema(
  {
    templateName: { type: String },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, strict: false }
);

let Template = mongoose.model("Template", templateSchema);

module.exports = Template;
