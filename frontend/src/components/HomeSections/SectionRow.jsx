import SkillCard from "../Dashboard/OwnerDashboard/CardsManager/SkillCard";

export default function SectionRow({ title, cards }) {

  if (!cards || cards.length === 0) return null;

  return (
    <div style={{ marginBottom: "40px" }}>

      <h2 style={{ marginBottom: "15px" }}>
        {title}
      </h2>

      <div className="homeSectionsGrid">

        {cards.map(card => (
          <div className="cardWrapper" key={card._id}>

            <SkillCard
              card={card}
              profilePhoto={card.user?.profilePhoto}
            />

          </div>
        ))}

      </div>

    </div>
  );
}