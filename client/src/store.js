/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import {createStore} from 'redux';
// import {configureStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
const store = createStore(rootReducer, composeWithDevTools());
// const store = configureStore(rootReducer, composeWithDevTools());

export default store;