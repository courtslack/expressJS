const router = require('express').Router()
const { request, response } = require('express')
const { getCollection, ObjectId } = require('../../../dbconnect')

let collection = null  //If I don’t have the collection, go get it. If I already have it, just use it.
const getPokemon = async () => {
    if (!collection) collection = await getCollection('PokemonAPI', 'Pokemon')
    return collection
}

router.get('/byId/:id', async (request, response) => {
    const { id } = request.params 
    const collection = await getPokemon()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with id: ${id}` }})
})

router.get('/random', async (request, response) => {  
    const collection = await getPokemon() 
    const count = await collection.countDocuments()
    const number = Math.floor(Math.random() * count) + 1   
    const found = await collection.findOne({ "number": parseInt(number) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with number: ${number}` }})
    console.log('pokemon routes loaded')
})

router.post('/add', async (request, response) => {
    const { number, name, type } = request.body
    const collection = await getPokemon()
    const { acknowledged, insertedId } = await collection.insertOne({ number, name, type })
    response.send({ acknowledged, insertedId })
})

router.get('/:number', async (request, response) => {
    const { number } = request.params
   // const collection = await getCollection('PokemonAPI', 'Pokemon')
    const collection = await getPokemon()
    const found = await collection.findOne({ "number": parseInt(number) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with number: ${number}` }})
})

router.get('/random/:type', async (request, response) => {
    const { type } = request.params
    //const collection = await getCollection('PokemonAPI', 'Pokemon')
    const collection = await getPokemon()
    const foundOfType = await collection.find({ "type": type }).toArray() //get all of type
    const count = foundOfType.length
    if (count === 0) response.send({ error: { message: `Could not find pokemon with type: ${type}` }})
    const number = Math.floor(Math.random() * count)// + 1 <-- error in the video
    console.log(number, foundOfType)
    response.send(foundOfType[number])

    // console.log(foundOfType);
    // response.send('done')
})

router.get('/', async (request, response) => {
    const collection = await getPokemon()
    const found = await collection.find().toArray() //gets all pokemon in array
    response.send(found)
})

router.get('/byName/:name', async (request, response) => {
    const { name } = request.params
    const collection = await getPokemon()

    const regexp = new RegExp(`^${name}`, 'i') //query parameters, to make the search case-insensitive
    const found = await collection.findOne({ name: regexp })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with name: ${name}` }})

})

module.exports = router


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