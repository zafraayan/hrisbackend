import Logs from "../models/logs.model.js";

export const getLogs = async () => {
  return await Logs.find();
};

export const addLogs = async (logData) => {
  const logs = new Logs(logData);
  return await logs.save();
};
