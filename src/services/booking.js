const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");
const { Train, Booking } = require("../models");

async function bookSeat(userId, trainId) {
  const transaction = await sequelize.transaction();
  try {
    // Lock the train record to prevent concurrent updates
    const train = await Train.findOne({
      where: { id: trainId },
      lock: true,
      transaction,
    });

    if (train.availableSeats <= 0) {
      throw new Error("No seats available");
    }

    // Book a seat
    train.availableSeats -= 1;
    await train.save({ transaction });

    // Create a booking record
    const booking = await Booking.create(
      { userId, trainId, seatNumber: train.totalSeats - train.availableSeats },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();
    return {
      success: true,
      message: "Seat booked successfully",
      bookingId: booking.id,
      seatNumber: booking.seatNumber,
      trainId: booking.trainId,
    };
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    return { success: false, message: error.message };
  }
}

module.exports = { bookSeat };
