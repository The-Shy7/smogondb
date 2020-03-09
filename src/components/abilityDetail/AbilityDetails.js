import React, { useState } from "react";
import DetailCalls from "../detail/DetailCalls";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

const AbilityDetails = ability => {
  const [showAbility, setShowAbility] = useState(false);

  return (
    <div className="ability">
      <span key={ability.name} className="s-Ability">
        {" "}
        {ability.name}{" "}
      </span>

      <button
        className="moveButton"
        onClick={() => setShowAbility(!showAbility)}
      >
        {showAbility ? (
          <KeyboardArrowDown style={{ fontSize: 17 }} />
        ) : (
          <KeyboardArrowRight style={{ fontSize: 17 }} />
        )}
      </button>
      
      <div className="callsContainer">
        {showAbility ? <DetailCalls abilityUrl={ability.url} /> : ""}
      </div>
    </div>
  )
}

export default AbilityDetails;