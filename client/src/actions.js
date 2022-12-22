/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

const createTrainer = (name) => ({
   type: 'CREATE_TRAINER', 
   payload: {
      name: name
   }
});

const deleteTrainer = (id) => ({
   type: 'DELETE_TRAINER',
   payload: {
      id: id
   }
});

const selectTrainer = (id) =>({
   type: 'SELECT_TRAINER',
   payload: {
      id: id
   }
});

const unselectTrainer = (id) => ({
   type: 'UNSELECT_TRAINER',
   payload: {
      id: id
   }
});

const catchPokemon = (trainerId, pokemonData) => ({
   type: 'CATCH_POKEMON',
   payload: {
      id: trainerId, 
      pokemonData: pokemonData
   }
});

const releasePokemon = (trainerId, pokemonData) =>({
   type: 'RELEASE_POKEMON',
   payload: {
      id: trainerId, 
      pokemonId: pokemonData.id
   }
});

module.exports = {
   createTrainer, 
   deleteTrainer, 
   selectTrainer, 
   unselectTrainer, 
   catchPokemon, 
   releasePokemon
}