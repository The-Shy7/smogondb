const fetch = require('node-fetch')

const root = 'https://pokeapi.co/api/v2'

module.exports = async function(req, res) {
  const {name} = req.query
  try {
    const url = `${root}/${name}/`
    const r = await fetch(url)
    const json = await r.json()
    res.status(200).send(json)
  } catch(e) {
    res.status(500).send('fail: '+e.message)
  }
}