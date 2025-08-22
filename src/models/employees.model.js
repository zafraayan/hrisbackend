import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String },
    name: { type: String, required: true },
    cardno: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Employees", employeeSchema, "employees");
