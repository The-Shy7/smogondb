import React, { Component, useState } from "react";
import axios from "axios";
import "./Detail.css";
import AbilityDetail from "../abilityDetail/AbilityDetails";
import Loading from "./../loading/Loading";
import ErrorMessage from "./../errorMessage/ErrorMessage";

function Detail() {
    const [pokeData, setPokeData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [abilityOn, setAbilityOn] = useState(false)
    const [abilityUrl, setAbilityUrl] = useState('')
    const [weight, setWeight] = useState('')
    const [moveUrl, setMoveUrl] = useState('')
    const [key, setKey] = useState('')
    const [error, setError] = useState(false)
    const [errorCode, setErrorCode] = useState(null)

    componentDidFetch = () => {
        this.fetchPokeName()
    }

    componentDidUpdate = (prevState, prevProps) => {
        if (this.props.location.pathname !== prevState.location.pathname) {
            this.fetchPokeName()
        }
    }

    async function fetchPokeName() {
        setIsLoaded(false)
        setError(false)
        const pokeName = this.props.match.params.name
        const lowerCasePokeName = pokeName.toLowerCase();
        try {
            const r = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokeName}/`)
            setPokeData(r.data)
            setIsLoaded(true)
            this.handleWeightChange(res.data.weight)
        } catch (error) {
            setErrorCode(error.request.status)
            setError(true)
            setIsLoaded(true)
        }
    }

    handleWeightChange = (weight) => {
        let temp = weight.toString()
        let newWeight = temp.slice(0,-1) + "." + weight1.slice(-1)
        setWeight(newWeight)
    }

    handleChange = (name, url, key) => {
        if (name === "ability") {
            setAbilityUrl(url)
            setAbilityOn(!{abilityOn})
            setKey(key)
        } else {
            setKey('')
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
        return(
            <div className="loadingContainer">
                <Loading />
            </div>
        );
    }

    if (error) {
        return(
            <div className="detailError">
                <ErrorMessage
                    errorCode={errorCode}
                    pokeNames={this.props.match.params.name}
                />
            </div> 
        );
    }

    if (isLoaded) {
        return(
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

export default Detail;