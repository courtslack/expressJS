const path = require('path')
const express = require('express');
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

// app.get('/test', (request, response) => {
//     response.send('Testing');
// }); 

app.get('/api/v1/random-pokemon', (request, response) => {
    const randomNmber = Math.floor(Math.random() * 9) 
    const randomPokemon = pokemon[randomNmber]
    response.send({ randomPokemon })
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});