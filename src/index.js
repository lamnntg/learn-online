import { connectDB } from "./config/mongoDB";
import express from "express";
import { env } from "./config/environments";
import { webRouter } from "./routes/web";
import auth from "./models/auth";

const Role = auth.role;

connectDB()
  .then(() => {
    console.log("connected db server");
    initial();
  })
  .then(() => {
    bootServer();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

const bootServer = () => {
  const app = express();
  // parse requests of content-type - application/json
  app.use(express.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/web", webRouter);

  app.listen(env.APP_PORT, () => {
    console.log(`Server is running on port : ${env.APP_PORT}`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};
