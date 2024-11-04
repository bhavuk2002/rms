const express = require("express");

const userRoute = require("./routers/user.js");
const trainRoute = require("./routers/train.js");

const app = express();

app.use(express.json()); // to access json from req handlers
app.use(userRoute);
app.use(trainRoute);

module.exports = app;
