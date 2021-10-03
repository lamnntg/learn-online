import { connectDB } from "./config/mongoDB";
import express from "express";
import { env } from "./config/environments";

connectDB()
  .then(() => {
    console.log("connected db server");
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

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  app.listen(env.APP_PORT, () => {
    console.log(`hello : ${env.APP_PORT}`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};
