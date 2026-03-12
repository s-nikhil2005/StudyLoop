import { useState, useRef } from "react";
import "./HoverCard.css";

export default function HoverCard({ children }) {

  const [hover, setHover] = useState(false);
  const [direction, setDirection] = useState("right");

  const cardRef = useRef(null);

  const handleMouseEnter = () => {

    const rect = cardRef.current.getBoundingClientRect();

    const screenWidth = window.innerWidth;

    const spaceRight = screenWidth - rect.right;

    if (spaceRight < 380) {
      setDirection("left");
    } else {
      setDirection("right");
    }

    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (

    <div
      ref={cardRef}
      className="hoverCardWrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {children}

      {hover && (

        <div className={`hoverPanel ${direction}`}>

          <h3 className="hoverTitle">
            Node.js - Beginner to Advance
          </h3>

          <p className="hoverDescription">
            Learn backend development with Node.js and Express.
          </p>

          <ul className="hoverList">
            <li>Deep understanding of JavaScript</li>
            <li>Build scalable Node.js apps</li>
            <li>Authentication with JWT</li>
          </ul>

          <div className="hoverActions">

            <button className="hoverPrimaryBtn">
              Book Session
            </button>

            <button className="wishlistBtn">
              ❤
            </button>

          </div>

        </div>

      )}

    </div>

  );
}