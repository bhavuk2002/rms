require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

const sequelize = require("./util/database");

sequelize
  .sync()
  .then((result) => {
    console.log("Database Syncronised");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
