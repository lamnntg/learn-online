import { connectDB, initialDB } from "./config/mongoDB";
import express from "express";
import { env } from "./config/environments";
import { webRouter } from "./routes/web";
import cors from "cors";

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

  app.use("/api", webRouter);

  app.listen(env.APP_PORT, () => {
    console.log(`Server is running on port : ${env.APP_PORT}`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};
