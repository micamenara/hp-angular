"use strict";

const User = require("../models/user");

const getUser = (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (!user) {
      return res.status(404).send({ message: "User does not exist" })
    }
    if (user) {
      return res.status(200).send(user);
    }
  });
};

const getAll = (req, res) => {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (users) {
      res.send(users);
    }
  });
};

const createUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio,
    image: req.body.image,
    tel: req.body.tel
  });

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("User Created successfully");
  });
};

module.exports = { getUser, createUser, getAll };
