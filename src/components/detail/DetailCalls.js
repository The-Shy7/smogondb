import React, { Component, useState } from "react";
import axios from "axios";
import "./DetailsCalls.css";
import Loading from "./../loading/Loading";

function DetailsCalls() {
    const [abilitiesList, setAbilitiesList] = useState([])
    const [movesList, setMovesList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [effectChance, setEffectChance] = useState('')

    function componentDidFetch() {
        if (this.props.abilityUrl) {
            setIsLoaded(false)
            axios,get(this.props.abilityUrl).then(all => {
                setAbilitiesList(all.data)
                setIsLoaded(true)
            })
        } else if (this.props.moveUrl) {
            setIsLoaded(false)
            axios.get(this.props.moveUrl).then(all => {
                setMovesList(all.data)
                setIsLoaded(true)
                this.effectSort
            })
        }
    }

    effectSort = () => {
        const effect = {movesList}.effect_entries;
        if ({movesList}.effect_chance) {
            let newEffect = effect[0].short_effect.slice(0, 6) + movesList.effect_chance + effect[0].short_effect.slice(20)
            setEffectChance(newEffect)
        }
    }

    renderType = (params) => {
        switch (params) {
            default:
                return "";
            case "grass":
                return "grass";
            case "poison":
                return "poison";
            case "fire":
                return "fire";
            case "water":
                return "water";
            case "fighting":
                return "fighting";
            case "flying":
                return "flying";
            case "dragon":
                return "dragon";
            case "normal":
                return "normal";
            case "fairy":
                return "fairy";
            case "electric":
                return "electric";
            case "ground":
                return "ground";
            case "ice":
                return "ice";
            case "dark":
                return "dark";
            case "steel":
                return "steel";
            case "bug":
                return "bug";
            case "psychic":
                return "psychic";
            case "rock":
                return "rock";
            case "ghost":
                return "ghost";
        }   
    }

    if (!isLoaded) {
        return <Loading />
    }

    if (this.props.abilityUrl) {
        return (
            <div className="abilityDesc">
              {abilitesList.effect_entries.map(({ short_effect }, i) => (
                <span key={i}>{short_effect}</span>
              ))}
            </div>
        );
    } else if (this.props.moveUrl) {
        return (
            <div className="moveDesc">
              <div className="Accuracy">
                {movesList.accuracy ? (
                  <span> Accuracy: {movesList.accuracy}%</span>
                ) : (
                  <span> Accuracy: N/A </span>
                )}
              </div>
              <div className="PP">
                <span> PP: {movesList.pp}</span>
              </div>
              <div className="Power">
                {movesList.power ? (
                  <span> Power: {movesList.power}</span>
                ) : (
                  <span> Power: N/A </span>
                )}
              </div>
              <div className="moveType">
                <span className="typeText"> Type: </span>
                <span className={this.renderTypes(movesList.type.name)}>
                  {movesList.type.name}{" "}
                </span>
              </div>
              <div className="moveEffect">
                {this.state.effectChance ? (
                  <span> {this.state.effectChance} </span>
                ) : (
                  <span>{movesList.effect_entries[0].short_effect} </span>
                )}
              </div>
            </div>
        );
    }
}