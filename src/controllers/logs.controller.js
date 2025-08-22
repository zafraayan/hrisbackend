import { addLogs, getLogs } from "../services/logs.service.js";
import { zkData } from "./zkdata.js";

export const listLogs = async (req, res, next) => {
  try {
    const logs = await getLogs();

    const groupedByUser = zkData.reduce((acc, log) => {
      if (!acc[log.userSn]) {
        acc[log.userSn] = [];
      }
      acc[log.userSn].push(log);
      return acc;
    }, {});

    const startDate = new Date(`2025-08-20T00:00:00+08:00`);
    const endDate = new Date(`2025-08-20T23:59:59+08:00`);

    const result = Object.keys(groupedByUser)
      .map((key) => {
        const logsForDay = groupedByUser[key].filter((log) => {
          const ts = new Date(log.recordTime);
          return ts >= startDate && ts <= endDate;
        });

        if (logsForDay.length > 0) {
          // format times
          const times = logsForDay.map((log) =>
            new Date(log.recordTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // 24-hour format
            })
          );

          return {
            userSn: key,
            times, // e.g. ["08:05", "12:01", "13:02", "17:30"]
          };
        }
        return null;
      })
      .filter(Boolean);

    res.status(200).json(result);
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
