import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      trim: true,
    },
    phone: {
      type: Number,
      unique:true
    },
    employeeID: {
      type: String,
      unique:true
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    Domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
