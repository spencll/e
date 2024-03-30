import React from "react";

const API =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

function Pokecard({ id, name, type, exp }) {
  let imgSrc = `${API}${id}${".png"}`;
  return (
    <div className="Pokecard">
      <h3 className="Pokecard-title">{name}</h3>
      <img className="Pokecard-image" src={imgSrc} />
      <div className="Pokecard-type">Type: {type}</div>
      <div className="Pokecard-exp">EXP: {exp}</div>
    </div>
  );
}

export default Pokecard;
