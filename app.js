const path = require('path')
const express = require('express');
//const { request } = require('http');
const app = express();
const port = 3000;
const root = path.join(__dirname, 'public')

const pokemon = [
    { id: 1, name: 'Bulbasaur', type: 'Grass' },
    { id: 2, name: 'Ivysaur', type: 'Grass' },
    { id: 3, name: 'Venusaur', type: 'Grass' },
    { id: 4, name: 'Charmander', type: 'Fire' },
    { id: 5, name: 'Charmeleon', type: 'Fire' },
    { id: 6, name: 'Charizard', type: 'Fire' },
    { id: 7, name: 'Squirtle', type: 'Water' },
    { id: 8, name: 'Wartortle', type: 'Water' },
    { id: 9, name: 'Blastoise', type: 'Water' },
]

//allow to send json use is middle wear
app.use(express.json())

//allow us to respond with static webpage
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})

app.get('/pokemon/:id', (request, response) => {
    response.sendFile('index.html', { root })
})

//app.get('/pokemon/???')

app.get('/api/v1/random-pokemon', (request, response) => {
    const randomNmber = Math.floor(Math.random() * 9) 
    const randomPokemon = pokemon[randomNmber]
    response.send({ randomPokemon })
});

app.get('/api/v1/pokemon/:id', (request, response) => {
    const { id } = request.params
    const found = pokemon.find(p => p.id.toString() === id)
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with id: ${id}` }})
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});

//exercise one
app.get ('/type/:type', (request, response) => {
    response.sendFile('index.html', {root})
})

app.get('/api/v1/random-pokemon/:type', (request, response) => {
    const { type } = request.params
    const found = pokemon.filter(p => p.type.toLocaleLowerCase() === type.toLowerCase())
    const r = Math.floor(Math.random() * found.length)
    if (found.length > 0 ) response.send(found[r])
    else response.send({ error: { message: `Could not find pokemon with type: ${type}` }})
});