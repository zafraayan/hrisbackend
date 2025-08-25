import { addLogs, delLogs, getLogs } from "../services/logs.service.js";
import { zkData } from "./zkdata.js";

export const dailyLogs = async (req, res, next) => {
  try {
    const logs = await getLogs();

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};

export const delEmplogs = async (req, res, next) => {
  try {
    const result = await delLogs(); // result has info (deletedCount, etc.)
    res.status(200).json({
      message: "All logs deleted successfully",
      result,
    });
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

export const insert = async () => {
  try {
    const logs = await Promise.all(
      zkData.map(async (el) => {
        return await addLogs(el);
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const monthlyLogs = async (req, res, next) => {
  const { from, to } = req.query;

  try {
    const logs = await getLogs();

    const groupedByUser = logs.reduce((acc, log) => {
      if (!acc[log.userSn]) {
        acc[log.userSn] = [];
      }
      acc[log.userSn].push(log);
      return acc;
    }, {});

    const startDate = new Date(`${from}T00:00:00+08:00`);
    const endDate = new Date(`${to}T23:59:59+08:00`);

    // const startDate = new Date(`2025-08-01T00:00:00+08:00`);
    // const endDate = new Date(`2025-08-02T23:59:59+08:00`);

    const result = Object.keys(groupedByUser)
      .map((key) => {
        const logsForDay = groupedByUser[key].filter((log) => {
          const ts = new Date(log.recordTime);
          return ts >= startDate && ts <= endDate;
        });

        if (logsForDay.length > 0) {
          // format times
          const times = logsForDay
            .map((log) => log.recordTime)
            .sort((a, b) => new Date(a) - new Date(b));

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

export const refetchLogs = async (req, res, next) => {
  const { from, to } = req.query;

  insert();
  try {
    const logs = await getLogs();

    const groupedByUser = logs.reduce((acc, log) => {
      if (!acc[log.userSn]) {
        acc[log.userSn] = [];
      }
      acc[log.userSn].push(log);
      return acc;
    }, {});

    const startDate = new Date(`${from}T00:00:00+08:00`);
    const endDate = new Date(`${to}T23:59:59+08:00`);

    // const startDate = new Date(`2025-08-01T00:00:00+08:00`);
    // const endDate = new Date(`2025-08-02T23:59:59+08:00`);

    const result = Object.keys(groupedByUser)
      .map((key) => {
        const logsForDay = groupedByUser[key].filter((log) => {
          const ts = new Date(log.recordTime);
          return ts >= startDate && ts <= endDate;
        });

        if (logsForDay.length > 0) {
          // format times
          const times = logsForDay
            .map((log) => log.recordTime)
            .sort((a, b) => new Date(a) - new Date(b));

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

//////////////////// zkteco fetching//////////////////////////////
// export const addEmplogs = async (req, res, next) => {
//   const zk = new ZKLib("192.168.68.201", 4370, 10000, 4000);
//   try {
//     await zk.createSocket();

//     const zklogs = await zk.getAttendances();

//     const logs = await Promise.all(
//       zklogs.data.map(async (el) => {
//         return await addLogs(el);
//       })
//     );

//     res.status(200).json(logs);
//     await zk.disconnect();
//   } catch (error) {
//     next(error);
//   }
// };

// export const insert = async () => {
//   const zk = new ZKLib("192.168.68.201", 4370, 10000, 4000);
//   try {
//     await zk.createSocket();

//     const zklogs = await zk.getAttendances();

//     const logs = await Promise.all(
//       zklogs.data.map(async (el) => {
//         return await addLogs(el);
//       })
//     );

//     await zk.disconnect();
//   } catch (error) {
//     console.log(error);
//   }
// };
