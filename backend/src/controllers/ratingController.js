const mongoose = require("mongoose");
const Rating = require("../models/ratingModel");
const Card = require("../models/Card"); // 🔥 NEW

exports.getRatings = async (req, res) => {
  try {
    const { type, id } = req.query;

    let matchStage = {};

    const objectId = new mongoose.Types.ObjectId(id);

    if (type === "paid") {
      matchStage.card = objectId;
    } else {
      matchStage.targetUser = objectId;
    }

    const ratings = await Rating.aggregate([
      { $match: matchStage },

      {
        $lookup: {
          from: "users",
          localField: "reviewer",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },

      {
        $lookup: {
          from: "profiles",
          localField: "reviewer",
          foreignField: "user",
          as: "profile"
        }
      },
      {
        $unwind: {
          path: "$profile",
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $project: {
          _id: 1,
          stars: 1,
          review: 1,
          createdAt: 1,
          reviewer: {
            _id: "$reviewer",
            fullName: {
              $ifNull: ["$profile.fullName", "User"]
            },
            profilePhoto: "$profile.profilePhoto"
          }
        }
      },

      { $sort: { createdAt: -1 } }
    ]);

    console.log("RATINGS:", ratings);

    const avg =
      ratings.length > 0
        ? (
            ratings.reduce((sum, r) => sum + r.stars, 0) /
            ratings.length
          ).toFixed(1)
        : 0;

    res.json({
      avgRating: avg,
      total: ratings.length,
      ratings
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ ADD RATING (UNCHANGED)
exports.addRating = async (req, res) => {
  try {
    const { type, cardId, targetUserId, stars, review } = req.body;
    const reviewer = req.user.id;

    const existing = await Rating.findOne({
      reviewer,
      ...(type === "paid"
        ? { card: cardId }
        : { targetUser: targetUserId })
    });

    if (existing) {
      return res.status(400).json({ message: "Already rated" });
    }

    const newRating = await Rating.create({
      reviewer,
      type,
      card: type === "paid" ? cardId : null,
      targetUser: type === "skill" ? targetUserId : null,
      stars,
      review
    });

    res.status(201).json({
      message: "Rating added",
      rating: newRating
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ UPDATED OVERALL RATING (🔥 FIXED ONLY THIS)
exports.getUserOverallRating = async (req, res) => {
  try {
    const { userId } = req.params;

    const objectId = new mongoose.Types.ObjectId(userId);

    // 🔥 STEP 1: Get all cards of this user
    const userCards = await Card.find({ user: objectId }).select("_id");
    const cardIds = userCards.map(card => card._id);

    // 🔥 STEP 2: Include BOTH skill + paid ratings
    const result = await Rating.aggregate([
      {
        $match: {
          $or: [
            { targetUser: objectId },      // skill ratings
            { card: { $in: cardIds } }    // paid card ratings
          ]
        }
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$stars" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    if (result.length === 0) {
      return res.json({
        avgRating: 0,
        totalReviews: 0
      });
    }

    res.json({
      avgRating: result[0].avgRating.toFixed(1),
      totalReviews: result[0].totalReviews
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};