const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Train = sequelize.define(
  "Train",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Train;

// const { Model, DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   class Train extends Model {}
//   Train.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       source: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       destination: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       totalSeats: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       availableSeats: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize, // We need to pass the `sequelize` instance here
//       modelName: "Train", // We choose the model name
//     }
//   );
//   return Train;
// };
