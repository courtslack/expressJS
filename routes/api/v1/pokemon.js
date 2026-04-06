const router = require('express').Router()

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

router.get('/random', (request, response) => {
    const r = Math.floor(Math.random() * 9)
    response.send(pokemon[r])
})

router.post('/add', (request, response) => {
    const { id, name, type } = request.body
    console.log({ id, name, type })

    const found = pokemon.find(p => p.id.toString() === id.toString())
    if (found) response.send({ error: { message: `Pokemon with id: ${id}, already exists`} })
    else pokemon.push({ id, name, type })
})

router.get('/:id', (request, response) => {
    const { id } = request.params
    const found = pokemon.find(p => p.id.toString() === id)
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with id: ${id}` }})
})

router.get('/random/:type', (request, response) => {
    const { type } = request.params
    const found = pokemon.filter(p => p.type.toLowerCase() === type.toLowerCase())
    const r = Math.floor(Math.random() * found.length)
    if (found.length > 0) response.send(found[r])
    else response.send({ error: { message: `Could not find pokemon with type: ${type}` }})
})

module.exports = router
