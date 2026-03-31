import { useState, useRef, useEffect } from "react";
import "./HoverCard.css";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../../services/cartServices";

// ✅ NEW IMPORT
import RatingModal from "../RatingModal/RatingModal";

export default function HoverCard({ children, data }) {

  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState({
    left: 0,
    height: 0
  });

  // ✅ EXISTING
  const [liked, setLiked] = useState(false);

  // ✅ NEW STATE (rating modal)
  const [showRating, setShowRating] = useState(false);

  const cardRef = useRef(null);
  console.log("FULL CARD DATA:", data);

  // ✅ EXISTING LOGIC (UNCHANGED)
  useEffect(() => {
    const checkCart = async () => {
      try {
        const res = await getCart();

        const exists = res.items?.some(
          (item) => item._id === data?._id
        );

        setLiked(exists);
      } catch (err) {
        console.log(err);
      }
    };

    if (data?._id) checkCart();
  }, [data?._id]);

  // ✅ EXISTING LOGIC (UNCHANGED)
  const handleWishlistClick = async () => {
    try {
      if (liked) {
        await removeFromCart(data._id);
        setLiked(false);
      } else {
        await addToCart(data._id);
        setLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMouseEnter = () => {
    const rect = cardRef.current.getBoundingClientRect();

    const panelWidth = 360;
    const gap = 12;

    const spaceRight = window.innerWidth - rect.right;

    let left;

    if (spaceRight >= panelWidth + gap) {
      left = rect.width + gap;
    } else {
      left = -panelWidth - gap;
    }

    setPosition({
      left,
      height: rect.height
    });

    setHover(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setHover(false), 100);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="hoverCardWrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}

        {hover && (
          <div
            className="hoverPanel"
            style={{
              left: position.left,
              height: position.height
            }}
          >
            {/* TEACH SECTION */}
            <div className="hoverTeachBlock">
              <h3 className="hoverSubject">
                {data?.teach?.subject} - {data?.teach?.level}
              </h3>

              <p className="hoverTopic">
                {data?.teach?.topic}
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="hoverDescription">
              {data?.description?.trim()
                ? data.description
                : "No description available"}
            </p>

            {/* BUTTONS */}
            <div className="hoverActions">

              {/* ✅ UPDATED RATING BUTTON */}
              <button
                className="hoverPrimaryBtn"
                onClick={() => setShowRating(true)}
              >
                Rating
              </button>

              {/* ✅ EXISTING WISHLIST */}
              <button
                className="wishlistBtn"
                onClick={handleWishlistClick}
              >
                {liked ? "❤️" : "🤍"}
              </button>

            </div>
          </div>
        )}
      </div>

      {/* ✅ NEW MODAL */}
      {showRating && (
        <RatingModal
          card={data}
          onClose={() => setShowRating(false)}
        />
      )}
    </>
  );
}