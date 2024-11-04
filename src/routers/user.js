const express = require("express");
const router = new express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

router.post("/createUser", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      "thisismysecret"
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
      throw new Error("Unable to login");
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      throw new Error("Unable to login");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      "thisismysecret"
    );

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
