require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  try {
    const authtoken = req.header("Authorization");
    if (!authtoken) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }
    const token = authtoken.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET); // Use your JWT secret key
    req.user = decoded; // Attach the user payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

const authorizeRole = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied: You do not have the required permissions",
      });
    }
    // proceed to the next middleware
    next();
  };
};

const apiKey = process.env.ADMIN_API_KEY;

const verifyAdminApiKey = (req, res, next) => {
  // Check if the API key is provided in the headers
  const providedApiKey = req.header("x-api-key");

  // Check if the provided API key matches the stored API key
  if (!providedApiKey || providedApiKey !== apiKey) {
    return res
      .status(403)
      .json({ message: "Access Denied: Invalid or missing API key" });
  }

  // API key is valid, proceed to the next middleware
  next();
};

module.exports = { authenticateToken, authorizeRole, verifyAdminApiKey };
