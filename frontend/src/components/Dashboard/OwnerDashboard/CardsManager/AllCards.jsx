import { useState, useRef, useEffect } from "react";
import { getUserCards } from "../../../../services/cardServices";
import { getUserOverallRating } from "../../../../services/ratingServices";
import SkillCard from "./SkillCard";
import "./AllCards.css";

export default function AllCards({ profile, setActiveTab, setSelectedCard }) {

  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [teachOpen, setTeachOpen] = useState(false);
  const [paidOpen, setPaidOpen] = useState(false);

  const [userRating, setUserRating] = useState(null);
  const menuRef = useRef(null);

  /* FETCH CARDS */

useEffect(() => {
  const fetchCards = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUserCards();
      setCards(data.cards || []);

      // ✅ IMPORTANT: use profile._id (NOT card.user)
      if (profile && profile._id) {
        const ratingRes = await getUserOverallRating(profile._id);
        setUserRating(ratingRes);
      }

      // ✅ OPTIONAL (for UI)
      if (data.cards && data.cards.length > 0) {
        setCurrentCard(data.cards[0]);
      }

    } catch (err) {
      console.error(err);
      setError("Failed to load your cards. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  fetchCards();
}, [profile]); // 🔥 MUST depend on profile

  /* CLOSE MENU OUTSIDE CLICK */

  useEffect(() => {

    const handler = (e) => {

      if (!menuRef.current?.contains(e.target)) {
        setMenuOpen(false);
      }

    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);

  }, []);

  /* FILTER */

  const teachLearnCards =
    cards.filter(card => card.type === "skill");

  const paidCards =
    cards.filter(card => card.type === "paid");

  const totalCards = cards.length;

  /* SELECT CARD */

  const handleCardSelect = (card) => {
    setCurrentCard(card);
    setMenuOpen(false);
  };

  

  return (
    <div className="cards-manager">

      <div className="cards-header">

        <h3>Total Cards: {totalCards}</h3>

        <div className="menu-wrapper" ref={menuRef}>

          {/* HAMBURGER */}

          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* DROPDOWN */}

          {menuOpen && (

            <div className="menu-dropdown">

              {/* TEACH / LEARN */}

              <div
                className="menu-title"
                onClick={() => setTeachOpen(!teachOpen)}
              >
                {teachOpen ? "▼" : "▶"} Teach / Learn Cards
              </div>

              {teachOpen && (

                <div className="menu-section">

                  {teachLearnCards.map(card => (

                    <div
                      key={card._id}
                      className="menu-card"
                      onClick={() => handleCardSelect(card)}
                    >

                      <div className="card-topic">
                        {card.teach?.topic}
                      </div>

                      <div className="card-level">
                        {card.teach?.level}
                      </div>

                    </div>

                  ))}

                </div>

              )}

              {/* PAID */}

              <div
                className="menu-title"
                onClick={() => setPaidOpen(!paidOpen)}
              >
                {paidOpen ? "▼" : "▶"} Paid Cards
              </div>

              {paidOpen && (

                <div className="menu-section">

                  {paidCards.map(card => (

                    <div
                      key={card._id}
                      className="menu-card"
                      onClick={() => handleCardSelect(card)}
                    >

                      <div className="card-topic">
                        {card.teach?.topic}
                      </div>

                      <div className="card-price">
                        ₹{card.price?.amount}
                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          )}

        </div>

      </div>

      {/* ERROR UI */}

      {error && (
        <div className="cards-error">
          {error}
        </div>
      )}

      {/* LOADING UI */}

      {loading && (
        <div className="cards-loading">
          Loading cards...
        </div>
      )}

      {/* EMPTY STATE */}

      {!loading && totalCards === 0 && (
        <div className="cards-empty">
          You haven't created any cards yet.
        </div>
      )}

      {/* MAIN CARD AREA */}

      {!loading && currentCard && (
        <div className="card-display">

          <SkillCard
            card={currentCard}
            profilePhoto={profile?.profilePhoto}
              userRating={userRating}
            onEditImage={(card) => {
              setSelectedCard(card);
              setActiveTab("images");
            }}
          />

        </div>
      )}

    </div>
  );
}