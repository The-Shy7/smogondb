import PokeGrid from "./../pokegrid/PokeGrid";
import Pages from "./../pages/Pages";
import React, { Component } from "react";
import axios from "axios";
import Loading from "./../loading/Loading";
import ErrorMessage from "./../errorMessage/ErrorMessage";
import { withRouter } from "react-router";
import "./PokeCalls.css";

class PokeCalls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      pokemonList: [],
      loading: false,
      sorted: false,
      sliceNum: 0,
      error: null,
      newPokemonList: [],
      pokeFilter: [],
      sliceEndNum: 50,
      pageNum: 1
    };
  }
  componentDidMount() {
    this.fetchPokemon();
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.filterList !== prevProps.filterList) {
      this.handleFilterList();
    }
    if (this.state.startNum !== prevState.startNum) {
      this.fetchPokemon();
    }
    if (this.state.sliceNum !== prevState.sliceNum) {
      this.fetchPokemon();
    }
  };
  handleFilterList = async () => {
    let regexPat = /\/pokemon\/(\d+)\//;
    let endNum;
    let startNum;
    let currentUrlParams = new URLSearchParams(window.location.search);
    let currentPageNum = currentUrlParams.get("page");
    currentPageNum = parseInt(currentPageNum);
    let pokeList = [];
    const { filterList } = this.props;
    this.setState({
      sorted: false,
      newPokemonList: []
    });

    if (this.props.filterList.length < 1) {
      this.fetchPokemon();
    }
    if (!currentPageNum) {
      endNum = 31;
      startNum = 0;
    } else {
      endNum = currentPageNum * 31;
      startNum = endNum - 31;
    }
    //Gathers filter data from pokeapi
    let filterPromises = filterList.map(filter =>
      axios.get(`https://pokeapi.co/api/v2/type/${filter}/`)
    );
    await Promise.all(filterPromises).then(all => {
      const data = all.map(result => result.data.pokemon);
      data.forEach(poke => poke.map(pokemon => pokeList.push(pokemon.pokemon)));
    });
    //Adds a id object to the pokemon object for getting images
    pokeList.map(poke => {
      let id = poke.url.match(regexPat)[1];
      return (poke["id"] = id);
    });
    //Slice pokeList to handle pagination
    let cutPokemon = pokeList.slice(startNum, endNum);
    this.setState({ newPokemonList: cutPokemon, sorted: true });
  };

  handlePagesClick = direction => {
    this.setState({ sorted: false });
    let currentUrlParams = new URLSearchParams(window.location.search);
    let currentPageNum = currentUrlParams.get("page");
    currentPageNum = parseInt(currentPageNum);

    if (!currentPageNum) {
      currentPageNum = 1;
    }
    if (direction === "next") {
      currentPageNum = currentPageNum + 1;
    } else if (direction === "prev" && currentPageNum !== 1) {
      currentPageNum = currentPageNum - 1;
    } else {
      currentPageNum = 1;
    }
    currentUrlParams.set("page", currentPageNum);
    this.props.history.push(`?page=${currentPageNum}`);
    //If filterList array is empty fetch pokemon normally else fetch the typed pokemon with handlefilterlist
    if (this.props.filterList.length < 1) {
      this.fetchPokemon();
    } else {
      this.handleFilterList();
    }
  };

  fetchPokemon = async () => {
    let offsetNum = 0;
    let regexPat = /\/pokemon\/(\d+)\//;
    let currentUrlParams = new URLSearchParams(window.location.search);
    let currentPageNum = currentUrlParams.get("page");
    if (currentPageNum > 26) {
      this.props.history.push("/404");
    }
    if (!currentPageNum) {
      offsetNum = 0;
    } else {
      offsetNum = currentPageNum * 30 - 30;
    }
    this.setState({ sorted: false, pokemonList: [] });
    //Fetches pokemon
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${offsetNum}`
    );
    let pokemon = res.data.results;
    pokemon.map(pokemon => {
      let id = pokemon.url.match(regexPat)[1];
      return (pokemon["id"] = id);
      //Adds id to pokemon object
    });
    this.setState({ pokemonList: pokemon, sorted: true });
  };

  render() {
    const { newPokemonList, pokemonList, sorted, error } = this.state;

    if (!sorted) {
      return (
        <div className="loadingContainer">
          <Loading />
        </div>
      );
    }
    if (error) {
      return (
        <div className="error">
          <ErrorMessage />
        </div>
      );
    }
    if (newPokemonList.length > 0) {
      return (
        <div>
          <PokeGrid pokemonList={newPokemonList} />
          <Pages handlePagesClick={this.handlePagesClick} />
        </div>
      );
    }
    return (
      <div>
        <PokeGrid pokemonList={pokemonList} />
        <Pages handlePagesClick={this.handlePagesClick} />
      </div>
    );
  }
}
export default withRouter(PokeCalls);