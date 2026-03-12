const express = require("express");
const homepageRouter = express.Router();

const { getHomepageCards } = require("../controllers/homepageControllers");
const { authenticate } = require("../middlewares/authMiddleware");

homepageRouter.get("/cards", authenticate, getHomepageCards);

module.exports = homepageRouter;