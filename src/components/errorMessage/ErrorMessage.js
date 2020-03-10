import React, { Component } from "react";
import "./ErrorMessage.css";

export default class ErrorMessage extends Component {
  render() {
    if (this.props.errorCode === "404")
      return (
        <div className="errorMessage">
          <h3>
            Oops! Looks like '{this.props.pokeNames}' is not a pokemon. Please
            try again.
          </h3>
        </div>
      );
    else {
      return (
        <div className="errorMessage">
          <h3>Oops! Something went wrong. Please try again.</h3>
        </div>
      );
    }
  }
}