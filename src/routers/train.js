const express = require("express");
const router = new express.Router();
const Train = require("../models/Train");
const Booking = require("../models/Booking");
const { bookSeat } = require("../services/booking");
const {
  authenticateToken,
  authorizeRole,
  verifyAdminApiKey,
} = require("../middleware/auth");

router.post(
  "/addTrain",
  authenticateToken,
  authorizeRole(["admin"]),
  verifyAdminApiKey,
  async (req, res) => {
    const train = new Train(req.body);
    try {
      await train.save();
      res.status(201).send(train);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.get(
  "/betweenStations",
  authenticateToken,
  authorizeRole(["user", "admin"]),
  async (req, res) => {
    try {
      const train = await Train.findAll({
        where: { source: req.query.source, destination: req.query.destination },
      });
      res.send(train);
    } catch (error) {
      res.send(500).send(error);
    }
  }
);

router.get(
  "/bookTrain",
  authenticateToken,
  authorizeRole(["user", "admin"]),
  async (req, res) => {
    try {
      const { trainId } = req.body;
      const userId = req.user.id;
      if (!trainId) {
        return res.status(400).json({ message: "Train ID is required" });
      }

      const result = await bookSeat(userId, trainId);

      if (result.success) {
        res.status(200).json({
          message: result.message,
          bookingId: result.bookingId,
          trainId: result.trainId,
          seatNumber: result.seatNumber,
        });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error booking seat:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//GET booking/3
router.get(
  "/booking/:bookingId",
  authenticateToken,
  authorizeRole(["user", "admin"]),
  async (req, res) => {
    const bookingId = req.params.bookingId;
    try {
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).send();
      }
      res.send(booking);
    } catch (error) {
      res.status(500).send();
    }
  }
);

router.get(
  "/bookings",
  authenticateToken,
  authorizeRole(["user", "admin"]),
  async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        where: { userId: req.user.id },
      });
      if (!bookings) {
        return res
          .status(200)
          .json({ message: "User has not made any bookings." });
      }
      res.status(200).send(bookings);
    } catch (error) {
      res.status(500).send();
    }
  }
);

module.exports = router;
