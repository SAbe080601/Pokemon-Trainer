/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes, NavLink} from 'react-router-dom';
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import PokemonList from './components/PokemonList';
import Trainers from './components/Trainers';


function App() {
  return (
    <Router>
      <div >
        <header className='App-header'>
          <div className='App'>
            <h1 className='App-title'>
            Welcome to Shinya Abe's Pokemon Trainer App Utilizing React.js and 
            Redux on the client and Express.js, Node.js, and Redis on the server
            </h1>
          </div>
          <nav>
            <NavLink className='button' to='/'>
              Home
            </NavLink>
            <NavLink className='button' to='/pokemon/page/0'>
              Pokemon
            </NavLink>
            <NavLink className='button' to='/trainers'>
              Trainers
            </NavLink>
          </nav>
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/pokemon/page/:pagenum' element={<PokemonList />} />
            <Route path='/pokemon/:id' element={<Pokemon />} />
            <Route path='/trainers'element = {<Trainers/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
