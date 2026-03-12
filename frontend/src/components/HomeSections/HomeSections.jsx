import { useEffect, useState } from "react";
import HoverCard from "./HoverCard";
import SkillCard from "../Dashboard/OwnerDashboard/CardsManager/SkillCard";
import { getHomepageCards } from "../../services/homepageServices";

import "./HomeSections.css";

export default function HomeSections() {

  const [sections, setSections] = useState({});

  useEffect(() => {

    const fetchCards = async () => {

      try {
        const res = await getHomepageCards();

        if (res.success) {
          setSections(res);
        }

      } catch (err) {
        console.error("Failed to fetch cards:", err);
      }

    };

    fetchCards();

  }, []);


  const renderSection = (title, cards) => {

    if (!cards || cards.length === 0) return null;

    return (

      <section className="homeSectionBlock">

        <h2 className="sectionTitle">{title}</h2>

        <div className="homeSectionsGrid">

          {cards.map(card => (

            <div className="cardWrapper" key={card._id}>
              
               <HoverCard >
              <SkillCard
                card={card}
                profilePhoto={card.user?.profilePhoto}
              />
              </HoverCard>

            </div>

          ))}

        </div>

      </section>

    );

  };


  return (

    <div className="homePageContainer">

      {renderSection(
        <>
          <span className="sectionSubject">Physics</span>
          <span className="sectionReason"> — Because you want to learn</span>
        </>,
        sections.physics
      )}

      {renderSection(
        <>
          <span className="sectionSubject">Chemistry</span>
          <span className="sectionReason"> — Because you want to learn</span>
        </>,
        sections.chemistry
      )}

      {renderSection(
        <>
          <span className="sectionSubject">Maths</span>
          <span className="sectionReason"> — Because you want to learn</span>
        </>,
        sections.maths
      )}

      {renderSection(
        <>
          <span className="sectionSubject">Biology</span>
          <span className="sectionReason"> — Because you want to learn</span>
        </>,
        sections.biology
      )}

      {renderSection(
        "Recommended for you",
        sections.recommended
      )}

      {renderSection(
        "Top Rated",
        sections.topRated
      )}

      {renderSection(
        "Popular",
        sections.popular
      )}

      {renderSection(
        "Trending",
        sections.trending
      )}

    </div>

  );

}