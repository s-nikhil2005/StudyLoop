import { useState } from "react";
import "./CardsManager.css";

import AllCards from "./AllCards";
import CardImages from "./CardImages";
import TeachLearnCards from "./TeachLearnCards";
import PaidCards from "./PaidCards";

export default function CardsManager({ profile }) {

  const [activeTab, setActiveTab] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="cards-wrapper">

      <h2>Cards Manager</h2>
      <p className="cards-subtitle">
        Manage your learning, teaching and paid cards.
      </p>

      <div className="cards-tabs">

        <span
          className={activeTab === "all" ? "active-tab" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Cards
        </span>

        <span
          className={activeTab === "images" ? "active-tab" : ""}
          onClick={() => setActiveTab("images")}
        >
          Card Images
        </span>

        <span
          className={activeTab === "teachlearn" ? "active-tab" : ""}
          onClick={() => setActiveTab("teachlearn")}
        >
          Teach / Learn
        </span>

        <span
          className={activeTab === "paid" ? "active-tab" : ""}
          onClick={() => setActiveTab("paid")}
        >
          Paid Cards
        </span>

      </div>

      <div className="cards-content">

        {activeTab === "all" && <AllCards profile={profile} 
                                     setActiveTab={setActiveTab}
                                      setSelectedCard={setSelectedCard}
                                    />}

        {activeTab === "images" && <CardImages profile={profile} 
                                     card={selectedCard}
                                    />}

        {activeTab === "teachlearn" && <TeachLearnCards profile={profile} />}

        {activeTab === "paid" && <PaidCards profile={profile} />}

      </div>

    </div>
  );
}