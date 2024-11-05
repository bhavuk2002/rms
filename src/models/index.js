const User = require("./User");
const Train = require("./Train");
const Booking = require("./Booking");

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Train.hasMany(Booking, { foreignKey: "trainId" });
Booking.belongsTo(Train, { foreignKey: "trainId" });

module.exports = { User, Train, Booking };
