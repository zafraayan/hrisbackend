import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    idNumber: { type: String },
    screenName: { type: String },
    gender: { type: String },
    status: { type: String },
    address: { type: String },
    contactNumber: { type: Number },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    sssNumber: { type: Number },
    philHealth: { type: Number },
    pagIbig: { type: Number },
    tin: { type: Number },
    dateOfBirth: { type: Date },
    department: { type: String },
    position: { type: String },
    dateHired: { type: Date },
    employmentType: { type: String },
    basicSalary: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Employees", employeeSchema, "employees");
