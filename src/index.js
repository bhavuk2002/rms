const app = require("./app");

const port = process.env.PORT || 3000;

const db = require("../models");
const sequelize = require("../util/database");

sequelize
  .sync()
  .then((result) => {
    console.log("Database updated");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
