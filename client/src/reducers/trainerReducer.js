/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import {v4 as uuid} from 'uuid';

let copyState = null;
let index = 0;

const trainerReducer = (state = [], action) => {
    const {type, payload} = action;

    switch (type) {
        case 'CREATE_TRAINER':
            console.log('payload', payload);
            return [...state, {id: uuid(), name: payload.name, selected: false, pokemon: []}];
        case 'DELETE_TRAINER':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState.splice(index, 1);
            return [...copyState];
        case 'SELECT_TRAINER':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].selected = true;
            return [...copyState];
        case 'UNSELECT_TRAINER':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].selected = false;
            return [...copyState];
        case 'CATCH_POKEMON':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].pokemon = [...copyState[index].pokemon, payload.pokemonData]
            return [...copyState];
        case 'RELEASE_POKEMON':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].pokemon = copyState[index].pokemon.filter((x) => x.id !== payload.pokemonId);
            return [...copyState];
        default:
            return state;
    }
}

export default trainerReducer;