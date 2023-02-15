const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var adminSchema = new mongoose.Schema(
  {
    name: {
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
      required: true,
      default: "superuser",
    },
    accessroutes: {
      type: Array,
      default: [
        "frontdesk",
        "backoffice",
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
    versionKey: false,
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});
adminSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const adminModel = mongoose.model("cruisemember", adminSchema);
module.exports = { adminModel };
