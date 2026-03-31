const express = require("express");
const cartRouters = express.Router();

const { authenticate } = require("../middlewares/authMiddleware");

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");



// routes
cartRouters.post("/add", authenticate, addToCart);
cartRouters.get("/", authenticate, getCart);
cartRouters.delete("/remove/:id", authenticate, removeFromCart);

module.exports = cartRouters;