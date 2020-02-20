import React from 'react';
import './App.css';

function App() {
  async function getMons() {
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+key
    url += '&q='+text
    const r = await fetch(url)
    const body = await r.json()
  }

  return (
    <div className="App">
      <PokeList/>
    </div>
  );
}

function PokeList() {
  return (<div className="poke-list">

  </div>
  );
}

export default App;
