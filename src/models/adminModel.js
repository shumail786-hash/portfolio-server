import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

const adminSchema = new Schema({
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
  createdAt: {
    type: String,
    default: dayjs(new Date().toISOString()).format("DD-MMMM-YYYY hh:mm:ss A"),
  },
  role: {
    type: String,
    default: "Admin",
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.SECRET_ACCESS_TOKEN,
    { expiresIn: process.env.EXPIRES_IN }
  );
};

export const Admin = mongoose.model("Admin", adminSchema);
