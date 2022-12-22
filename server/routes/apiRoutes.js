/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/
const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
const data = require('../data');
const check = require('../check');
const limit = 20;

client.connect().then(() => {});

router.get('/page/:pagenum', async(req, res) => {
    console.log("Pokemon Page NOT in Cache");
    let pageNum = req.params.pagenum;
    try{
        if(pageNum === "0"){
            pageNum = 0;
        } else {
            pageNum = Number.parseInt(pageNum);
        }
        pageNum = check.check_num(pageNum, 'pageNum', 'get-pokemon/:pageNum');

    } catch (e) {
        return res.status(400).json({error: e})
    }

    try {
        const pokemonData = await data.getPokemonByPage(pageNum); 
        let total = pokemonData.count;
        pageNum = check.check_page(pageNum, total, limit, 'pageNum', 'get-pokemon/:pageNum');
        let key = `pokemon/page/${pageNum}`;
        await client.set(key, JSON.stringify(pokemonData));
        return res.status(200).json(pokemonData);
    } catch (e){
        return res.status(404).json({"error-not-found": e})
    }
})

router.get('/:id', async(req, res) => {
    console.log('Pokemon NOT in Cache');
    let id = req.params.id;
    try{
        if(id === '0'){
            id = 0;
        } else {
            id = parseInt(req.params.id);
        }
        id =  check.check_num(id, 'id', 'get-pokemon/:id')
    } catch (e) {
        return res.status(400).json({error: e})
    }

    try {
        const pokemonData = await data.getPokemonById(id);
        
        await client.set(req.params.id, JSON.stringify(pokemonData));
        
        return res.status(200).json(pokemonData);
    } catch (e) {
        return res.status(404).json({"error-not-found": e})
    }
})

module.exports = router;