const Card = require("../models/Card");
const Profile = require("../models/profileSchema");
const User = require("../models/userSchema");
const cloudinary = require("../config/cloudinary");
/* =====================================
CREATE CARD
===================================== */

const createCard = async (req, res) => {
  try {

    console.log("REQUEST BODY:", req.body);
    console.log("USER:", req.user);

    const userId = req.user._id;
    const { type, teach, learn, price , description} = req.body;

    /* ---------- BASIC VALIDATION ---------- */

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Card type is required"
      });
    }

    if (!teach || !teach.subject || !teach.topic || !teach.level) {
      return res.status(400).json({
        success: false,
        message: "Teach subject, topic and level are required"
      });
    }

    if (!description || description.trim() === "") {
  return res.status(400).json({
    success: false,
    message: "Description is required"
  });
}

    /* ---------- DUPLICATE CARD CHECK ---------- */

    const existingCard = await Card.findOne({
      user: userId,
       type: type,
      "teach.subject": teach.subject,
      "teach.topic": teach.topic,
      "teach.level": teach.level
    });

    if (existingCard) {
      return res.status(400).json({
        success: false,
        message: "You already created this card"
      });
    }

    /* ---------- BUILD CARD DATA ---------- */

    const cardData = {
      user: userId,
      type,
      teach,
      description: description.trim()
    };

    /* save learn only if user entered it */

    if (learn && learn.subject && learn.topic && learn.level) {
      cardData.learn = learn;
    }

    /* save price only for paid cards */

    if (type === "paid") {

      if (!price || !price.amount) {
        return res.status(400).json({
          success: false,
          message: "Price amount is required for paid cards"
        });
      }

      cardData.price = {
        amount: price.amount,
        currency: price.currency || "INR"
      };
    }

    console.log("FINAL CARD DATA:", cardData);

    /* ---------- CREATE CARD ---------- */

    const newCard = await Card.create(cardData);

    res.status(201).json({
      success: true,
      message: "Card created successfully",
      card: newCard
    });

  } catch (error) {

    console.error("CREATE CARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server error while creating card"
    });

  }
};



/* =====================================
GET USER CARDS
===================================== */

const getUserCards = async (req, res) => {
  try {

    const userId = req.user._id;

    const cards = await Card.find({
      user: userId,
      isActive: true
    }).sort({ createdAt: -1 });

    /* separate card types */

    const skillCards = cards.filter(card => card.type === "skill");
    const paidCards = cards.filter(card => card.type === "paid");

    res.status(200).json({
      success: true,
      totalCards: cards.length,
      skillCards,
      paidCards,
      cards
    });

  } catch (error) {

    // console.error("GET USER CARDS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch cards"
    });

  }
};


/* =====================================
GET ALL CARDS (SEARCH)
===================================== */

const searchCards = async (req, res) => {

  try {

    const { topic, subject, type } = req.query;

    let filter = { isActive: true };

    if (topic) {
      filter["teach.topic"] = topic;
    }

    if (subject) {
      filter["teach.subject"] = subject;
    }

    if (type) {
      filter.type = type;
    }

    const cards = await Card.find(filter)
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(cards);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/* =====================================
GET SINGLE CARD
===================================== */

const getCard = async (req, res) => {

  try {

    const card = await Card.findById(req.params.id)
      .populate("user", "username");

    if (!card) {
      return res.status(404).json({
        message: "Card not found"
      });
    }

    res.json(card);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


/* =====================================
DELETE CARD (SOFT DELETE)
===================================== */

const deleteCard = async (req, res) => {

  try {

    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        message: "Card not found"
      });
    }

    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    card.isActive = false;

    await card.save();

    res.json({
      message: "Card removed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateCardImage = async (req, res) => {

  try {

    const { cardId } = req.params;
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        message: "Image URL required"
      });
    }

    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({
        message: "Card not found"
      });
    }

    card.image = image;

    await card.save();

    res.json({
      message: "Card image updated",
      image: card.image
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

const getCardsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const cards = await Card.find({ user: userId })
      .populate("user", "username profilePhoto");

    res.status(200).json({
      success: true,
      cards
    });

  } catch (error) {
    console.error("Get Cards By User Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user cards"
    });
  }
};

const navbarSearch = async (req, res) => {
  try {
    const { q } = req.query;

    // ✅ safety check
    if (!q || q.trim().length < 2) {
      return res.json({ cards: [] });
    }

    const searchRegex = new RegExp(q, "i");

    const cards = await Card.find({
      isActive: true,
      $or: [
        { "teach.topic": searchRegex },
        { "teach.subject": searchRegex },
        { description: searchRegex }
      ]
    })
      .populate("user", "username")
      .limit(8);

    res.json({ cards });

  } catch (error) {
    console.error("NAVBAR SEARCH ERROR:", error); // 👈 ADD THIS
    res.status(500).json({
      message: "Server error in navbar search"
    });
  }
};

module.exports = {
  createCard,
  getUserCards,
  searchCards,
  getCard,
  deleteCard,
    updateCardImage,
    getCardsByUserId,
    navbarSearch
};