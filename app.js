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

//allow to send json use is middle wear
app.use(express.json())

//allow us to respond with static webpage
app.use(express.static('public'))

// attach endpoints
app.use('/api/v1/pokemon', require('./routes/api/v1/pokemon'))

app.use(require('./routes/static')) // useing static rounts





app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});

