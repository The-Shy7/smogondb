import React from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import "./Pages.css";

const Pages = ({handlePagesClick}) => {
    return (
        <div className="pokeButtons">
          <button
            onClick={() => handlePagesClick("prev")}
            className="paginationBtn"
          >
            <KeyboardArrowLeft style={{ fontSize: 20 }} />
          </button>
    
          <button
            onClick={() => handlePagesClick("next")}
            className="paginationBtn"
          >
            <KeyboardArrowRight style={{ fontSize: 20 }} />
          </button>
        </div>
      )
}

export default Pages;