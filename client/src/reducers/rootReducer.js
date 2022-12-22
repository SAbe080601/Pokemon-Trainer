/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/



import {combineReducers} from 'redux';
import trainerReducer from './trainerReducer';


const rootReducer = combineReducers({
  trainers: trainerReducer,
});

export default rootReducer;