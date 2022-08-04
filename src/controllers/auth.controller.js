import auth from "../models/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/auth";

const User = auth.user;
const Role = auth.role;

const signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

const signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      //TODO : ban user -> check status account

      var authorities = [];

      let isAdmin = false;
      if (user.roles.length == 0) {
        return res
          .status(404)
          .send({ message: "Account is blocked" });
      }
        
      for (let i = 0; i < user.roles.length; i++) {
        if (user.roles[i].name == "admin") {
          isAdmin = true;
        }

        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      if (isAdmin === true) {
        return res
          .status(404)
          .send({ message: "Account is Admin! Please login in Admin page" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (req.body.password == user.password) {
        passwordIsValid = true;
      }

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        description: user.description,
        address: user.address,
        status: user.status,
        avatar_url: user.avatar_url,
        roles: authorities,
        accessToken: token,
      });
    });
};

const adminSignin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var authorities = [];
      var isAdmin = false;
      if (user.roles.length == 0) {
        return res
          .status(404)
          .send({ message: "Account is blocked" });
      }
      
      for (let i = 0; i < user.roles.length; i++) {
        if (user.roles[i].name == "admin") {
          isAdmin = true;
        }

        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      if (!isAdmin) {
        return res.status(401).send({
          accessToken: null,
          message: "You are not Admin!",
        });
      }

      console.log(authorities);

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (req.body.password == user.password) {
        passwordIsValid = true;
      }

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        description: user.description,
        address: user.address,
        status: user.status,
        avatar_url: user.avatar_url,
        roles: authorities,
        accessToken: token,
      });
    });
};

export const authWebController = { signup, signin, adminSignin };
