const { Schema, model } = require("mongoose");

const PaxInfoSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    sex: { type: String, required: true },
    type: { type: String, required: true },
    cabin: { type: String, required: false },
    country: { type: String, required: true },
    personalAddress: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    bookingNo: { type: Number, required: true },
    paxManifestNo: { type: Number, required: true },
    nationality: { type: String, required: true },
    issuePlace: { type: String, required: true },
    issueDate: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PaxData = model("paxdata", PaxInfoSchema);
module.exports = PaxData;
