import React from "react";

function CharacterCard({ image }) {
  return (
    <div className="character-container">
      <img className="character" src={image} alt="character" />
    </div>
  );
}

export default CharacterCard;
