import React, { useState } from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Loading from "./../loading/Loading";
import DetailsCalls from "../detail/DetailsCalls";

const MoveDetail = ({ move }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { name, url } = move;
  console.log(name);
  return (
    <div className="moves">
      <span className="s-Moves">{name}</span>
      <button
        className="moveButton"
        onClick={() => {
          setShowDetail(!showDetail);
        }}
      >
        {showDetail ? (
          <KeyboardArrowDown style={{ fontSize: 17 }} />
        ) : (
          <KeyboardArrowRight style={{ fontSize: 17 }} />
        )}
      </button>

      <div className="movesCalls">
        {showDetail ? <DetailsCalls moveUrl={url} /> : ""}
      </div>
    </div>
  )
}

export default MoveDetail;