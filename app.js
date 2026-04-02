const express = require('express');
const app = express();
const port = 3000;

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

//allow to send json
app.use(express.json())

app.get('/', (req, res) => {
    response.send('hello');
});

app.get('/test', (req, res) => {
    response.send('Testing');
}); 

app.get('/api/v1/random-pokemon', (req, res) => {
    const randomNmber = Math.floor(Math.random() * 8) 
    const randomPokemon = pokemon[randomNmber]
    response.send({ randomPokemon })
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});