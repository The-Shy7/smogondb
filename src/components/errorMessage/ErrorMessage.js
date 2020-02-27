import React, { Component } from "react";
import "./ErrorMessage.css";

function ErrorMessage() {
    if (this.props.errorCode === '404') {
        return (
            <div className="errorMessage">
                <h3>
                    Oops! Looks like '{this.props.pokeNames}' is not a pokemon. Please try again.
                </h3>
            </div>     
        );
    } else {
        return (
            <div className="errorMessage">
                <h3>Oops! Something went wrong. Please try again.</h3>
            </div>   
        );
    }
}

export default ErrorMessage;