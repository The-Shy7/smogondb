import React, { Component } from "react";
import PokeCalls from "./pokecalls/PokeCalls";
import SearchBar from "./searchBar/SearchBar";
import Detail from "./detail/Detail";
import NavBar from "./navbar/NavBar";
import Generations from "./generations/Generations";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorMessage from "./errorMessage/ErrorMessage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeFilters: []
    };
  }

  handleFilters = typeFilters => {
    if (!typeFilters) {
      this.setState({ typeFilters: [] });
    }
    this.setState({ typeFilters: typeFilters });
  };

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <NavBar />

          <SearchBar filter={this.handleFilters} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <PokeCalls filterList={this.state.typeFilters} />}
            />
            <Route exact path="/detail/:name" component={Detail} />
            <Route exact path="/generations/:num" component={Generations} />
            <Route component={ErrorMessage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
