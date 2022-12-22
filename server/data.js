/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

const axios = require('axios');
const check = require('./check');
const limit = 20;
async function getPokemonByPage(pageNum) {
    pageNum = check.check_num(pageNum, 'pageNum', 'getPokemonByPage');
    let offset = pageNum * 20;
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    return data;
}

async function getPokemonById (id){
    id = check.check_num(id, 'id', 'getPokemonById');
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
}

module.exports = {
    getPokemonById, 
    getPokemonByPage
}