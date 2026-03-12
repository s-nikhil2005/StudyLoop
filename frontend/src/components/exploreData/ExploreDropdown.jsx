import { useState } from "react";
import "./ExploreDropdown.css";

const data = {
  JEE: {
    "Class 11": {
      Physics: [
        "Units & Dimensions",
        "Motion in One Dimension",
        "Laws of Motion",
        "Work Energy Power",
        "Rotational Motion",
        "Gravitation",
        "Thermodynamics",
        "Oscillations & Waves"
      ],
      Chemistry: [
        "Atomic Structure",
        "Periodic Table",
        "Chemical Bonding",
        "Thermodynamics",
        "Equilibrium",
        "Redox Reactions",
        "Organic Chemistry Basics"
      ],
      Maths: [
        "Sets & Relations",
        "Trigonometric Functions",
        "Complex Numbers",
        "Quadratic Equations",
        "Permutations & Combinations",
        "Binomial Theorem",
        "Limits & Derivatives"
      ]
    },
    "Class 12": {
      Physics: [
        "Electrostatics",
        "Current Electricity",
        "Magnetism",
        "Electromagnetic Induction",
        "Ray Optics",
        "Wave Optics",
        "Modern Physics"
      ],
      Chemistry: [
        "Solid State",
        "Electrochemistry",
        "Chemical Kinetics",
        "d & f Block Elements",
        "Coordination Compounds",
        "Biomolecules"
      ],
      Maths: [
        "Matrices & Determinants",
        "Continuity & Differentiability",
        "Applications of Derivatives",
        "Integrals",
        "Differential Equations",
        "Vectors",
        "3D Geometry",
        "Probability"
      ]
    }
  },

  NEET: {
    "Class 11": {
      Physics: [
        "Motion",
        "Laws of Motion",
        "Work Energy Power",
        "Thermodynamics",
        "Oscillations"
      ],
      Chemistry: [
        "Atomic Structure",
        "Chemical Bonding",
        "Equilibrium",
        "Organic Chemistry"
      ],
      Biology: [
        "Cell Structure",
        "Plant Physiology",
        "Human Physiology",
        "Biomolecules",
        "Ecology Basics"
      ]
    },
    "Class 12": {
      Physics: [
        "Electrostatics",
        "Current Electricity",
        "Modern Physics"
      ],
      Chemistry: [
        "Electrochemistry",
        "Coordination Compounds",
        "Biomolecules"
      ],
      Biology: [
        "Genetics",
        "Evolution",
        "Ecology",
        "Human Health & Disease"
      ]
    }
  }
};

export default function ExploreDropdown() {
  const [exam, setExam] = useState(null);
  const [cls, setCls] = useState(null);
  const [subject, setSubject] = useState(null);

  return (
    <div className="menu-container">

      <div className="menu">
        {Object.keys(data).map((item) => (
          <div
            key={item}
            className="menu-item"
            onMouseEnter={() => {
              setExam(item);
              setCls(null);
              setSubject(null);
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {exam && (
        <div className="menu">
          {Object.keys(data[exam]).map((item) => (
            <div
              key={item}
              className="menu-item"
              onMouseEnter={() => {
                setCls(item);
                setSubject(null);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {cls && (
        <div className="menu">
          {Object.keys(data[exam][cls]).map((item) => (
            <div
              key={item}
              className="menu-item"
              onMouseEnter={() => setSubject(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {subject && (
        <div className="menu lessons">
          {data[exam][cls][subject].map((lesson) => (
            <div key={lesson} className="menu-item">
              {lesson}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}