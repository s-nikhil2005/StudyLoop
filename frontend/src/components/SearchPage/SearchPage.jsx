import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { navbarSearch } from "../../services/cardServices"; // same axios
import HoverCard from "../HomeSections/HoverCard";
import SkillCard from "../Dashboard/OwnerDashboard/CardsManager/SkillCard";

export default function SearchPage() {

  const [cards, setCards] = useState([]);

  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {

    const fetchCards = async () => {
      try {
        const res = await navbarSearch(query); // reuse your API
        setCards(res.cards || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (query) fetchCards();

  }, [query]);

  return (
    <div className="homePageContainer">

      <h2 className="sectionTitle">
        Results for "{query}"
      </h2>

      {cards.length > 0 ? (

        <div className="homeSectionsGrid">

          {cards.map(card => (

            <div className="cardWrapper" key={card._id}>

              <HoverCard data={card}>
                <SkillCard
                  card={card}
                  profilePhoto={card.user?.profilePhoto}
                />
              </HoverCard>

            </div>

          ))}

        </div>

      ) : (
        <p style={{ padding: "20px" }}>
          No results found
        </p>
      )}

    </div>
  );
}