const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// const { Model, DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   class Booking extends Model {}
//   Booking.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       trainId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       seatNumber: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize, // We need to pass the `sequelize` instance here
//       modelName: "Booking", // We choose the model name
//     }
//   );
//   return Booking;
// };

module.exports = Booking;
