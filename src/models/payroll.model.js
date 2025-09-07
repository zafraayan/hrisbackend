import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  name: { type: String },
});

export default mongoose.model("Payroll", payrollSchema, "payrolls");
