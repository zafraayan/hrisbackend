// const express = require("express");
// const ZKLib = require("node-zklib");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// // const { Parser } = require("json2csv");

// const app = express();
// app.use(cors());
// const port = 3001;
// const filePath = path.join(__dirname, "attlog.dat");

// app.get("/attendance", (req, res) => {
//   //uploading .dat file
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading attlog.dat:", err);
//       return res.status(500).send("Failed to read attlog.dat");
//     }

//     //spliting data into rows
//     const logs = data
//       .split("\n")
//       .filter(Boolean)
//       .map((line) => {
//         const [userId, date, time] = line.trim().split(/\s+/);
//         return {
//           userId,
//           timestamp: `${date}T${time}`,
//         };
//       });

//     //group records by ID
//     const groupedByUser = logs.reduce((acc, log) => {
//       if (!acc[log.userId]) {
//         acc[log.userId] = [];
//       }
//       acc[log.userId].push(log);
//       return acc;
//     }, {});

//     //criterion initialization
//     const { cDate } = req.query;
//     const keys = Object.keys(groupedByUser);
//     const startDate = new Date(`${cDate}T00:00:00`);
//     const endDate = new Date(`${cDate}T23:59:59`);

//     const result = [];

//     keys.forEach((key) => {
//       const wew = logs.filter((el) => {
//         const ts = new Date(el.timestamp);
//         return el.userId === key.toString() && ts >= startDate && ts <= endDate;
//       });

//       if (wew.length > 0) {
//         result.push({
//           id: key.toString(),
//           timestamps: wew.map((log) => log.timestamp),
//         });
//       }
//     });

//     res.json(result);
//   });
// });

// app.get("/export-attendance", async (req, res) => {
//   const zk = new ZKLib("192.168.1.201", 4370, 10000, 4000); // replace with your device's IP

//   try {
//     await zk.createSocket();

//     const logs = await zk.getAttendances();
//     await zk.disconnect();

//     const logData = logs.data.map((log) => ({
//       UID: log.userSn,
//       UserID: log.deviceUserId,
//       Timestamp: log.recordTime.toLocaleString("en-PH", {
//         year: "numeric",
//         month: "short",
//         day: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//       }),
//       Type: log.type,
//     }));

//     const json2csvParser = new Parser({
//       fields: ["UID", "UserID", "Timestamp", "Type"],
//     });
//     const csv = json2csvParser.parse(logData);

//     const filePath = "./attendance_logs.csv";
//     fs.writeFileSync(filePath, csv);

//     res.download(filePath, "attendance_logs.csv", () => {
//       fs.unlinkSync(filePath); // delete after sending
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving or exporting attendance logs");
//   }
// });

// app.get("/users", async (req, res) => {
//   const zk = new ZKLib("192.168.1.201", 4370, 10000, 4000); // replace with your device IP

//   try {
//     await zk.createSocket();

//     const users = await zk.getUsers();
//     await zk.disconnect();

//     res.json(users.data); // This contains an array of user objects
//   } catch (error) {
//     console.error("Failed to retrieve users:", error);
//     res.status(500).send("Error retrieving users");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

import app from "../app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
