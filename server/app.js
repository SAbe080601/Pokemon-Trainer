/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

const express = require('express');
const cors = require('cors');
const app = express();

const redis = require('redis');
const client = redis.createClient();
client.connect().then(()=>{});

const configRoutes = require('./routes');

app.use(cors());

app.get('/pokemon/:id', async (req, res, next) => {
    let exists = await client.exists(req.params.id);
    if(exists){
        console.log('Pokemon in Cache');
        let pokemon = await client.get(req.params.id);
        return res.status(200).json(JSON.parse(pokemon));
    } else {
        next();
    }
});

app.get('/pokemon/page/:pagenum', async (req, res, next) => {
    let key = `pokemon/page/${req.params.pagenum}`;
    let exists = await client.exists(key);
    if(exists){
        console.log('Pokemon Page in Cache');
        let pokemonData = await client.get(key);
        return res.status(200).json(JSON.parse(pokemonData));
    } else {
        next();
    }
});

configRoutes(app);

app.listen(3001, async () =>{
    await client.flushAll();
    console.log("We've got a server!");
    console.log('Your routes will be running on http://localhost:3001');
})