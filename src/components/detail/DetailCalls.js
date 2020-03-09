import React, { Component } from "react";
import axios from "axios";
import "./DetailCalls.css";
import Loading from "./../loading/Loading";

export default class DetailCalls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilitesList: [],
      movesList: [],
      isLoaded: false,
      effectChance: ""
    };
  }
  componentDidMount() {
    if (this.props.abilityUrl) {
      this.setState({ isLoaded: false });
      axios.get(this.props.abilityUrl).then(all => {
        this.setState({
          abilitesList: all.data,
          isLoaded: true
        });
      });
    } else if (this.props.moveUrl) {
      this.setState({ isLoaded: false });
      axios.get(this.props.moveUrl).then(all => {
        this.setState(
          {
            movesList: all.data,
            isLoaded: true
          },
          this.effectSort
        );
      });
    }
  }
  effectSort = () => {
    //Adds percentage value to effect chance
    const { movesList } = this.state;
    const effect = movesList.effect_entries;
    if (movesList.effect_chance) {
      let newEffect =
        effect[0].short_effect.slice(0, 6) +
        movesList.effect_chance +
        effect[0].short_effect.slice(20);
      this.setState({ effectChance: newEffect });
    }
  };
  renderTypes = params => {
    switch (params) {
      default:
        return "";
      case "grass":
        return "grassDesc";
      case "poison":
        return "poisonDesc";
      case "fire":
        return "fireDesc";
      case "water":
        return "waterDesc";
      case "fighting":
        return "fightingDesc";
      case "flying":
        return "flyingDesc";
      case "dragon":
        return "dragonDesc";
      case "normal":
        return "normalDesc";
      case "fairy":
        return "fairyDesc";
      case "electric":
        return "electricDesc";
      case "ground":
        return "groundDesc";
      case "ice":
        return "iceDesc";
      case "dark":
        return "darkDesc";
      case "steel":
        return "steelDesc";
      case "bug":
        return "bugDesc";
      case "psychic":
        return "psychicDesc";
      case "rock":
        return "rockDesc";

      case "ghost":
        return "ghostDesc";
    }
  };

  render() {
    const { abilitesList, movesList, isLoaded } = this.state;

    if (!isLoaded) {
      return <Loading />;
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
}