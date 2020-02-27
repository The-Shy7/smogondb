import React, {useState} from "react";
import SearchBar from "./searchBar/SearchBar";
import Detail from "./detail/Detail";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorMessage from "./errorMessage/ErrorMessage";

function App() {
  const [typeFilters, setTypeFilters] = useState([])

  handleFilters = (typeFilters) => {
    if (!typeFilters) {
      setTypeFilters = []
    } 
    
    setTypeFilters = typeFilters
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>

        <SearchBar filter={this.handleFilters} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PokeCalls filterList={this.state.typeFilters} />}
          />
          <Route exact path="/detail/:name" component={Detail} />
          <Route component={ErrorMessage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
