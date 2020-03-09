import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./PokeGrid.css";
import Detail from "./../detail/Detail";

export default class PokeGrid extends Component {
  render() {
    return (
      <section className="pokeGridContainer">
        {this.props.pokemonList.map(({ name, id }) => (
          <Link key={id} to={`/detail/${name}`}>
            <div className="pokeGridItemContainer" key={id}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt="pokemon"
              />
              <span className="pokeName">
                {name} #{id}
              </span>
            </div>
          </Link>
        ))}
        <Route exact path="detail/:name" component={Detail} />
      </section>
    );
  }
}