const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
  }
);

User.addHook("beforeCreate", async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.prototype.toJSON = function () {
  const user = this.get();

  // removing sensitive or unwanted information
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;

  return user;
};

module.exports = User;
