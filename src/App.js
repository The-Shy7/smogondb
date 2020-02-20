import React, {useState} from 'react';
import './App.css';

function App() {
  const [mon, setMon] = useState([])

  async function getMons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/'
    const numMon = 721
    url += '' + numMon + '/'
    const r = await fetch(url)
    const body = await r.json()
    setMon(body.sprites.front_default)
  }

  return (
    <div className="App">
      <PokeList
        onKeyPress={e=> {
          if(e.key==='Enter') getMons()
        }}
      />
    </div>
  );
}

function PokeList() {
  return (<div className="poke-list">

  </div>
  );
}

export default App;
