import { addLogs, getLogs } from "../services/logs.service.js";
import { zkData } from "./zkdata.js";

export const listLogs = async (req, res, next) => {
  try {
    const logs = await getLogs();
    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};

export const addEmplogs = async (req, res, next) => {
  try {
    const logs = await Promise.all(
      zkData.map(async (el) => {
        return await addLogs(el);
      })
    );

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};
