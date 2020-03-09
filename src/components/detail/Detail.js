import React, { Component } from "react";
import axios from "axios";
import "./Detail.css";
import AbilityDetail from "../abilityDetail/AbilityDetails";
import Loading from "./../loading/Loading";
import ErrorMessage from "./../errorMessage/ErrorMessage";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeData: [],
      isLoaded: false,
      abilityOn: false,
      abilityUrl: "",
      weight: "",
      moveUrl: "",
      key: "",
      error: false,
      errorCode: null
    };
  }
  componentDidMount = () => {
    this.fetchPokeName();
  };

  componentDidUpdate = (prevState, prevProps) => {
    if (this.props.location.pathname !== prevState.location.pathname) {
      this.fetchPokeName();
    }
  };
  fetchPokeName = async () => {
    this.setState({
      isLoaded: false,
      error: false
    });
    const pokeName = this.props.match.params.name;
    const lowerCasePokeName = pokeName.toLowerCase();
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${lowerCasePokeName}/`
      );
      this.setState(
        {
          pokeData: res.data,
          isLoaded: true
        },
        this.handleWeightChange(res.data.weight)
      );
    } catch (error) {
      this.setState({
        errorCode: error.request.status,
        error: true,
        isLoaded: true
      });
    }
  };
  handleWeightChange = weight => {
    //Fixes weight to better show weight
    let weight1 = weight.toString();
    let newWeight = weight1.slice(0, -1) + "." + weight1.slice(-1);
    this.setState({ weight: newWeight });
  };
  handleChange = (name, url, key) => {
    if (name === "ability") {
      this.setState({
        abilityUrl: url,
        abilityOn: !this.state.abilityOn,
        key: key
      });
    } else {
      this.setState({ key: "" });
    }
  };
  renderType = params => {
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
  };

  render() {
    const { pokeData, isLoaded, weight, error, errorCode } = this.state;

    if (!isLoaded) {
      return (
        <div className="loadingContainer">
          <Loading />
        </div>
      );
    }
    if (error) {
      return (
        <div className="detailError">
          <ErrorMessage
            errorCode={errorCode}
            pokeNames={this.props.match.params.name}
          />
        </div>
      );
    }
    if (isLoaded) {
      return (
        <div className="pokeDetail">
          <div className="topBoxWrapper">
            <div className="pokePicture">
              <div className="pokeNameContainer">
                <h3 className="pokeDetailName">{pokeData.name}</h3>
                <p>#{pokeData.id}</p>
              </div>
              <img src={pokeData.sprites.front_default} alt="pokemon icon" />
            </div>
            <div className="weightContainer">
              <p className="p-weight"> Weight </p>
              <div className="weight">
                <p> {weight} kg </p>
              </div>
            </div>
            <div className="typeContainer">
              {pokeData.types.map(({ type }, i) => (
                <div className={this.renderType(type.name)}>
                  <span className="s-Type" key={i}>
                    {type.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="shiny">
              <p className="p-Shiny">Shiny Version </p>
              <div className="shinySprite">
                <img src={pokeData.sprites.front_shiny} alt="shiny version" />
              </div>
            </div>
          </div>
          <div className="abilityContainer">
            <h3 className="p-Abilites">Abilities</h3>
            <div className="pokeAbilities">
              {pokeData.abilities.map(({ ability }, i) => (
                <AbilityDetail key={i} name={ability.name} url={ability.url} />
              ))}
            </div>
          </div>
          <div className="stats">
            <h3 className="p-Stats"> Stats </h3>
            <div className="pokeContainer">
              {pokeData.stats.map(({ base_stat, stat }, i) => (
                <div>
                  <span className="statName" key={i}>
                    {" "}
                    {stat.name}{" "}
                  </span>
                  <div className="statContainer">
                    <div style={{ width: base_stat }} className="statBar">
                      <span>{base_stat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Detail;