const mongoose = require("mongoose");
const bcrypt  = require("bcrypt");

var emailSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "superuser",
    },
    ar: {
      type: Array,
      default: [
        "frontdesk",
        "backdesk",
        "foodorder",
        "sales",
        "loyalitymgmt",
        "inventory",
        "crewmgmt",
        "reporting",
      ],
    },
  },
  {
    timestamps: true,
  }
);

emailSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});
emailSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const superMgmtModel = mongoose.model("cruisemember", emailSchema);
module.exports = { superMgmtModel };
