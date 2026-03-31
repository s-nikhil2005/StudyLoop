const express = require("express");
const router = express.Router();

const { addRating, getRatings, getUserOverallRating} = require("../controllers/ratingController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, addRating);
router.get("/", getRatings);
router.get("/user-rating/:userId", getUserOverallRating);

module.exports = router;