require("dotenv").config();
const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/createUser", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_TOKEN_SECRET
    );
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(400).json({ message: "Unable to login" });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Unable to login" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_TOKEN_SECRET
    );

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
