import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LinearProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';

function App() {
  const [mons, setMon] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function getMons() {
    setLoading(true)
    setMon([])
    let url = 'https://pokeapi.co/api/v2/pokemon/'
    const numMon = 721
    url += '' + numMon + '/'
    const r = await fetch(url)
    const body = await r.json()
    setMon(body)
    setText('')
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth variant="outlined"
            label="Search Pokemon!"
            value={text}
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=> {
              if(e.key==='Enter') getMons()
            }}
          />
          <Button variant="contained" color="primary"
            onClick={getMons}>
            <Search />
            Search
          </Button>
        </div>
      </header>
      {loading && <LinearProgress />}
      
      {/* <div className="memes">
        {mons.map((mon,i)=> <Pokemon key={i} {...mon} />)}
      </div> */}
    </div>
  );
}

// function Pokemon({name, sprites}) {
//   const url = sprites.front_default
  
//   return (<div className="poke-cell">
//     {<img alt={name} src={url} />}
//   </div>)
// }

export default App;
