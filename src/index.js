import { connectDB, initialDB } from "./config/mongoDB";
import express from "express";
import { env } from "./config/environments";
import { webRouter } from "./routes";
import { socket } from "socket.io";
import cors from "cors";
import http from "http";

connectDB()
  .then(() => {
    console.log("connected db server");
    initialDB();
  })
  .then(() => {
    bootServer();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const bootServer = () => {
  const app = express();
  // parse requests of content-type - application/json
  app.use(express.json());
  app.use(cors());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // socket.io
  const server = http.createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const users = {};
  const socketToRoom = {};

  io.on("connection", (socket) => {
    socket.on("join room", (roomID) => {
      if (users[roomID]) {
        const length = users[roomID].length;
        if (length === 4) {
          socket.emit("room full");
          return;
        }
        users[roomID].push(socket.id);
        console.log("a user connected : " + socket.id);
      } else {
        users[roomID] = [socket.id];
        console.log("new room maked : " + "roomid :" + roomID + "socket:" + socket.id);
      }
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

      socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", (payload) => {
      io.to(payload.userToSignal).emit("user joined", {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on("returning signal", (payload) => {
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        id: socket.id,
      });
    });

    socket.on("disconnect", () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomID] = room;
      }
      console.log("disconnect");
    });
  });

  server.listen(process.env.PORT || 8000, () =>
    console.log("server is running on port 8000")
  );

  // routes
  app.use("/api", webRouter);

  app.listen(env.APP_PORT, () => {
    console.log(`Server is running on port : ${env.APP_PORT}`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};
