const express = require("express");
const cardRoutes = express.Router();

const { authenticate } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const {
  createCard,
  getUserCards,
  searchCards,
  getCard,
  deleteCard,
    updateCardImage
} = require("../controllers/cardControllers");

/* CREATE CARD */
cardRoutes.post("/create-card", authenticate, createCard);

/* USER CARDS */
cardRoutes.get("/my-cards", authenticate, getUserCards);

/* SEARCH */
cardRoutes.get("/search", searchCards);

/* SINGLE CARD */
cardRoutes.get("/:id", getCard);

/* DELETE CARD */
cardRoutes.delete("/:id", authenticate, deleteCard);

cardRoutes.patch(
  "/:cardId/image",
  authenticate,
  upload.single("image"),
  updateCardImage
);

module.exports = cardRoutes;