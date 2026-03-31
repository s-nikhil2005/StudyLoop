import { useState, useEffect } from "react";
import { addRating, getRatings } from "../../services/ratingServices";
import "./RatingModal.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function RatingModal({ card, onClose }) {
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [review, setReview] = useState("");
  const [ratingData, setRatingData] = useState(null);
  const [error, setError] = useState(""); // 🔥 NEW

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await getRatings({
          type: card.type,
          id: card.type === "paid" ? card._id : card.user._id
        });

        setRatingData(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRatings();
  }, [card]);

  const handleSubmit = async () => {
    try {
      setError("");

      let payload = {
        type: card.type,
        stars,
        review
      };

      if (card.type === "paid") {
        payload.cardId = card._id;
      } else {
        payload.targetUserId = card.user._id;
      }

      await addRating(payload);

      const res = await getRatings({
        type: card.type,
        id: card.type === "paid" ? card._id : card.user._id
      });

      setRatingData(res);
      setStars(0);
      setReview("");

    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg); // 🔥 SHOW ERROR
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* LEFT */}
        <div className="modal-left">
          <h2>Give Rating</h2>

          <div className="stars">
            {[1,2,3,4,5].map((num) => (
              <span
                key={num}
                onClick={() => setStars(num)}
                onMouseEnter={() => setHoverStars(num)}
                onMouseLeave={() => setHoverStars(0)}
                className={(hoverStars || stars) >= num ? "star active" : "star"}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* 🔥 ERROR MESSAGE */}
          {error && <p className="error-msg">{error}</p>}

          <div className="modal-actions">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="modal-right">
          {ratingData?.ratings?.length > 0 ? (
            ratingData.ratings.map((r) => (
              <div key={r._id} className="review-card">

                {/* AVATAR */}
                {r.reviewer?.profilePhoto ? (
                  <img src={r.reviewer.profilePhoto} alt="user" className="avatar" />
                ) : (
                  <div className="avatar fallback">
                    {r.reviewer?.fullName?.charAt(0)}
                  </div>
                )}

                {/* CONTENT */}
                <div className="review-body">

                  <div className="review-header">
                    <h4>{r.reviewer?.fullName}</h4>
                    <span>{dayjs(r.createdAt).fromNow()}</span>
                  </div>

                  <div className="review-stars">
                    {"★".repeat(r.stars)}
                    {"☆".repeat(5 - r.stars)}
                  </div>

                  <p className="review-text">{r.review}</p>

                  <div className="review-actions">
                    <span>Helpful?</span>
                    <button>👍</button>
                    <button>👎</button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="empty">No reviews yet</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default RatingModal;