import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/profileService";
import { getUserCardsByUserId } from "../../../services/cardServices";
import { getUserOverallRating } from "../../../services/ratingServices";
import SkillCard from "../OwnerDashboard/CardsManager/SkillCard";
import "./PublicProfile.css";

function PublicProfile() {
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [cards, setCards] = useState([]);
  const [userRating, setUserRating] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const profileRes = await getUserProfile(userId);
      setProfile(profileRes.profile);

      const cardsRes = await getUserCardsByUserId(userId);
      setCards(cardsRes.cards || []);

      // 🔥 NEW: fetch overall rating
      const ratingRes = await getUserOverallRating(userId);
      setUserRating(ratingRes);

    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [userId]);

  if (!profile) return <p className="loading">Loading...</p>;

  // 🔥 Separate cards
const skillExchangeCards = cards.filter(
  c => c.type === "skill"
);
  const paidCards = cards.filter(c => c.type === "paid");

  console.log(cards);

  return (
    <div className="publicProfileContainer">

        

      {/* 🔥 TOP SECTION */}
      <div className="topSection">

        {/* LEFT */}
        <div className="topLeft">

          <div className="tagsRow">
            <span>{profile.classLevel || "N/A"}</span>
            <span>{profile.examTarget || "N/A"}</span>
          </div>

          <h1>{profile.fullName}</h1>

          <p className="headline">
            {profile.headline || "No headline added"}
          </p>

        </div>

        {/* RIGHT */}
        <div className="topRight">
          {profile.profilePhoto ? (
            <img src={profile.profilePhoto} alt="profile" />
          ) : (
            <div className="avatarFallback">
              {profile.fullName?.[0]}
            </div>
          )}
        </div>

      </div>

      {/* 🔥 STATS */}
      <div className="statsSection">

        <div className="statBox">
           <h3>{userRating?.avgRating || 0}</h3>
  <p>Rating</p>
        </div>

        <div className="statBox">
          <h3>{profile.teachingConfig?.totalSessions || 0}</h3>
  <p>Sessions</p>
        </div>

        <div className="statBox">
         <h3>{userRating?.totalReviews || 0}</h3>
  <p>Reviews</p>
        </div>

      </div>

      {/* 🔥 BIO */}
      <div className="bioSection">
        <h2>About Me</h2>
        <p>{profile.bio || "No bio available"}</p>
      </div>

      {/* 🔥 SKILL EXCHANGE */}
      {skillExchangeCards.length > 0 && (
        <div className="cardsSection">
          <h2>Skill Exchange</h2>

          <div className="cardsGrid">
            {skillExchangeCards.map(card => (
              <SkillCard
                key={card._id}
                card={card}
                profilePhoto={profile.profilePhoto}
              />
            ))}
          </div>
        </div>
      )}

      {/* 🔥 PAID SESSIONS */}
      {paidCards.length > 0 && (
        <div className="cardsSection">
          <h2>Paid Sessions</h2>

          <div className="cardsGrid">
            {paidCards.map(card => (
              <SkillCard
                key={card._id}
                card={card}
                profilePhoto={profile.profilePhoto}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default PublicProfile;