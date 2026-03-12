import "./SkillCard.css";
import { useNavigate } from "react-router-dom";

export default function SkillCard({ card , profilePhoto, onEditImage}) {

    const navigate = useNavigate();

const handleChat = () => {
  const userId = card?.user?._id;

  if (!userId) return;

  navigate(`/chat/${userId}`);
};
   



  const data = card;
  const type = data?.type === "paid" ? "paid" : "teachLearn";

  const teachSkills = [
    data?.teach?.subject,
    data?.teach?.topic,
    data?.teach?.level
  ].filter(Boolean);

  const learnSkills = [
    data?.learn?.subject,
    data?.learn?.topic,
    data?.learn?.level
  ].filter(Boolean);

  return (
    <div className="skillCard">

      {/* HEADER IMAGE */}
  <div
  className="cardHeader clickable"
  onClick={() => onEditImage(card)}
>
  <img
    className="cardHeaderImg"
    src={card?.image || profilePhoto || "/defaultCard.jpg"}
    alt="card banner"
  />
  <div className="overlay"></div>
</div>


      {/* STATS SECTION */}
      <div className="statsBar">

        <div>
          <strong>{data?.rating || 0}</strong>
          <span>Rating</span>
        </div>

        <div>
          <strong>{data?.sessions || 0}</strong>
          <span>Sessions</span>
        </div>

        <div>
          <strong>{data?.reviews || 0}</strong>
          <span>Reviews</span>
        </div>

      </div>


      {/* BODY */}
      <div className="cardBody">

        {/* CAN TEACH */}
        <div className="skillSection">

          <p className="label">
            {type === "paid" ? "CAN TEACH" : "I CAN TEACH"}
          </p>

          <div className="tags">
            {teachSkills.map((skill, i) => (
              <span key={i} className="tag teachTag">
                {skill}
              </span>
            ))}
          </div>

          {/* MONEY SECTION MOVED HERE */}
          {type === "paid" && (
            <div className="priceSection">
              <strong>₹{data?.price?.amount || 0}</strong>
              <span> Per Session</span>
            </div>
          )}

        </div>


        {/* CAN LEARN */}
        {type === "teachLearn" && (
          <div className="skillSection">

            <p className="label">I WANT TO LEARN</p>

            <div className="tags">
              {learnSkills.map((skill, i) => (
                <span key={i} className="tag learnTag">
                  {skill}
                </span>
              ))}
            </div>

          </div>
        )}


        {/* BUTTONS */}
        <div className="cardActions">

          <button className="btnOutline">
            View Profile
          </button>

          {type === "teachLearn" && (
            <button className="btnPrimary"
              onClick={handleChat}
              >
              Exchange Knowledge →
            </button>
          )}

          {type === "paid" && (
            <button className="btnPrimary"
              onClick={handleChat}
            >
              Book Session →
            </button>
          )}

        </div>

      </div>

    </div>
  );
}