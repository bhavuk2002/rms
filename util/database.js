const Sequelize = require("sequelize");

const sequelize = new Sequelize("rms", "root", "bhavuk", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
