import mongoose from "mongoose";

const logsSchema = new mongoose.Schema(
  {
    userSn: { type: String, required: true },
    deviceUserId: { type: String, required: true },
    recordTime: { type: String, required: true },
    ip: { type: String, required: true },
  },
  { timestamps: true }
);

logsSchema.index({ userSn: 1, recordTime: 1 }, { unique: true });

export default mongoose.model("Logs", logsSchema, "logs");
