import Card from "../models/Card.js";
import Profile from "../models/profileSchema.js";

export const getHomepageCards = async (req, res) => {
  try {

    const userId = req.user ? req.user._id.toString() : null;

    /* -------------------------
       GET USER PROFILE
    ------------------------- */

    let profile = null;

    if (userId) {
      profile = await Profile.findOne({ user: userId });
    }

    const hasLearningData = !!profile;

    /* -------------------------
       FETCH CARDS
    ------------------------- */

    const allCards = await Card
      .find({ isActive: true })
     .lean() 
      .populate("user", "name profilePhoto");

    const cards = allCards.filter(
      c => !userId || c.user._id.toString() !== userId
    );

    const format = (card) => ({
      _id: card._id,
      user: card.user,
      type: card.type,
      image: card.image,
      teach: card.teach,
      learn: card.learn,
      price: card.price,
       description: (card.description || "").trim(),
      rating: card.stats?.rating || 0,
      sessions: card.stats?.sessions || 0,
      reviews: card.stats?.reviews || 0
    });


    const used = new Set();

    const take = (list, limit = 8) => {
      const result = [];

      for (const card of list) {

        const id = card._id.toString();

        if (!used.has(id)) {
          used.add(id);
          result.push(format(card));
        }

        if (result.length >= limit) break;
      }

      return result;
    };

    /* -------------------------
       NEW USER
    ------------------------- */

    if (!hasLearningData) {

      const trending = take(
        [...cards].sort(
          (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
        )
      );

      const popular = take(
        [...cards].sort(
          (a,b)=> (b.stats?.sessions || 0) - (a.stats?.sessions || 0)
        )
      );

      const topRated = take(
        [...cards]
          .filter(c => c.type === "paid")
          .sort((a,b)=> (b.stats?.rating || 0) - (a.stats?.rating || 0))
      );

      return res.status(200).json({
        success: true,
        trending,
        popular,
        topRated
      });
    }

    /* -------------------------
       EXISTING LOGIC
    ------------------------- */

    const skillCards = cards.filter(c => c.type !== "paid");
    const paidCards  = cards.filter(c => c.type === "paid");

    const physics = take(
      skillCards.filter(c => c.teach?.subject === "Physics")
    );

    const chemistry = take(
      skillCards.filter(c => c.teach?.subject === "Chemistry")
    );

    const maths = take(
      skillCards.filter(c => c.teach?.subject === "Maths")
    );

    const biology = take(
      skillCards.filter(c => c.teach?.subject === "Biology")
    );

    const recommended = take(skillCards);

    const topRated = take(
      [...paidCards].sort(
        (a,b) => (b.stats?.rating || 0) - (a.stats?.rating || 0)
      )
    );

    const popular = take(
      [...paidCards].sort(
        (a,b) => (b.stats?.sessions || 0) - (a.stats?.sessions || 0)
      )
    );

    const experts = take(
      [...paidCards].sort(
        (a,b) => (b.price?.amount || 0) - (a.price?.amount || 0)
      )
    );

    res.status(200).json({
      success: true,
      physics,
      chemistry,
      maths,
      biology,
      recommended,
      topRated,
      popular,
      experts
    });

  } catch (error) {

    console.error("Homepage error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};