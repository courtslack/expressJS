const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

// const pokemon = [
//     { id: 1, name: 'Bulbasaur', type: 'Grass' },
//     { id: 2, name: 'Ivysaur', type: 'Grass' },
//     { id: 3, name: 'Venusaur', type: 'Grass' },
//     { id: 4, name: 'Charmander', type: 'Fire' },
//     { id: 5, name: 'Charmeleon', type: 'Fire' },
//     { id: 6, name: 'Charizard', type: 'Fire' },
//     { id: 7, name: 'Squirtle', type: 'Water' },
//     { id: 8, name: 'Wartortle', type: 'Water' },
//     { id: 9, name: 'Blastoise', type: 'Water' },
// ]

// router.get('/random', (request, response) => {
//     const r = Math.floor(Math.random() * 9)
//     response.send(pokemon[r])
// })
router.get('/random', async (_, response) => {
    const collection = await getCollection('PokemonAPI', 'Pokemon')
    const count = await collection.countDocuments()
    const number = Math.floor(Math.random() * count) + 1
    const found = await collection.findOne({ "number": parseInt(number) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with number: ${number}` }})
})

router.post('/add', (request, response) => {
    const { id, name, type } = request.body
    console.log({ id, name, type })

    const found = pokemon.find(p => p.id.toString() === id.toString())
    if (found) response.send({ error: { message: `Pokemon with id: ${id}, already exists`} })
    else pokemon.push({ id, name, type })
})

// router.get('/:id', (request, response) => {
//     const { id } = request.params
//     const found = pokemon.find(p => p.id.toString() === id)
//     if (found) response.send(found)
//     else response.send({ error: { message: `Could not find pokemon with id: ${id}` }})
// })

router.get('/:number', async (request, response) => {
    const { number } = request.params
    const collection = await getCollection('PokemonAPI', 'Pokemon')
    const found = await collection.findOne({ "number": parseInt(number) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with number: ${number}` }})
})

router.get('/random/:type', async (request, response) => {
    const { type } = request.params
    const collection = await getCollection('PokemonAPI', 'Pokemon')
    const foundOfType = await collection.find({ "type": type }).toArray()
    const count = foundOfType.length
    if (count === 0) response.send({ error: { message: `Could not find pokemon with type: ${type}` }})
    const number = Math.floor(Math.random() * count)// + 1 <-- error in the video
    //console.log(number, foundOfType)
    response.send(foundOfType[number])
})

module.exports = router
