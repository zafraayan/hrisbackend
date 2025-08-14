import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    sssNumber: { type: Number, required: true },
    philHealth: { type: Number, required: true },
    pagIbig: { type: Number, required: true },
    tin: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    dateHired: { type: Date, required: true },
    employmentType: { type: String, required: true },
    basicSalary: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    bankAccount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
