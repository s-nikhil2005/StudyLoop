import "./ProfilePreviewCard.css";
import { useNavigate } from "react-router-dom";



export default function ProfilePreviewCard({
  profile,
  cardCount = 0,
  onEditCards
}) {


  const navigate = useNavigate();
  if (!profile) return null;

console.log("FULL PROFILE:", profile);

  // function to generate initials
  const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (words[0][0] + words[1][0]).toUpperCase();
  };

  // choose name source
  const displayName =
    profile?.fullName ||
    profile?.user?.username ||
    "";

  const initials = getInitials(displayName);

  const profileImage = profile?.profilePhoto;

  return (
    <div className="ppc-card">


      <div className="ppc-image">

        {profileImage ? (
          <img src={profileImage} alt="profile" />
        ) : (
          <div className="ppc-avatar">
            {initials}
          </div>
        )}

      </div>

      <div className="ppc-card-count">
        Cards: {cardCount}
      </div>

      <div className="ppc-buttons">

        <button
          className="ppc-edit-btn"
          onClick={onEditCards}
        >
          Edit Cards
        </button>

        <button
  className="btnPrimary"
  onClick={() => navigate(`/user/${profile?.user?._id}`)}
>
  View Profile
</button>

      </div>

    </div>
  );
}