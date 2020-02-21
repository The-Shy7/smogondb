import React, {useState, useContext} from 'react';
import './App.css';
import {Input, Button} from 'antd'

const ctxt = React.createContext()

function App() {
  const [state, setState] = useState({
    searchTerm:''
  })
  return <ctxt.Provider value={{
    ...state,
    set: v=> setState({...state, ...v})
  }}>
    <div className="App">
      <Header />
    </div>
  </ctxt.Provider>
}

function Header() {
  const ctx = useContext(ctxt)
  const {loading, searchTerm} = ctx
  return <header className="App-header">
    <div className="logo-wrap">
      <img className="logo"
        alt="smogon logo"
        src="https://www.smogon.com/forums/media/twitter.png"
      />
      Pokemon Smogon Dex
    </div>
    <Input 
      value={searchTerm} disabled={loading}
      onChange={e=> ctx.set({searchTerm: e.target.value})}
      style={{height:'1.1rem',fontSize:'0.8rem',marginTop:65,marginLeft:'27.5rem'}} 
      onKeyPress={e=>{
        if(e.key==='Enter' && searchTerm) search(ctx)
      }}
    />
    <Button style={{marginLeft:'0.3rem',height:'1.4rem',marginTop:65}}
      onClick={()=> search(ctx)} type="primary"
      disabled={!searchTerm} loading={loading}>
      Search
    </Button>
  </header>
}

async function search({searchTerm, set}) {
  try {
    const term = searchTerm
    set({error:'', loading:true})
    const url = `https://pokeapi.co/api/v2/pokemon/${term}/`
    const r = await fetch(url)
    const mon = await r.json()
    console.log(mon)
    set({mon, loading:false, searchTerm:''})
    return <div className="poke-list">
      <Mon/>
    </div>
  } catch(e) {
    set({error: e.message})
  }
}

function Mon({sprites, name}) {
  const url = sprites.front_default
  
  return (<div className="poke-cell" onClick={()=>window.open(url, '_blank')}>
    <div className="mon-name">{name}</div>
    {<img alt={name} src={url} />}
  </div>)
}

export default App;
