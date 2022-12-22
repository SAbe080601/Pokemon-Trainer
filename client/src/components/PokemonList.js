/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import noImage from '../img/download.jpeg';


import axios from 'axios';
import CatchReleaseButton from './CatchReleaseButton';

import '../App.css';

import {useSelector} from 'react-redux';
/**
 * Question:
 * 1. How do I render images on main Pokemon List Page 
 */

function PokemonList() {
   const [pokemonPageData, setPokemonPageData] = useState(undefined);
   const [individualPokemonData, setIndividualPokemonData] = useState([{}]);
   const [next, setNext] = useState(undefined);
   const [prev, setPrev] = useState(undefined);
   const [loading, setLoading] = useState(true);
   const [exists, setExists] = useState(true);
   const {pagenum} = useParams();

   let currentPage = Number.parseInt(pagenum);
   let prevPage = currentPage - 1;
   let nextPage = currentPage + 1;

   let li = null;
   let buttonText = undefined;
   let imageUrl = null;

   const allTrainers = useSelector((state) => state.trainers);

   useEffect(() => {
      console.log('render');
      async function fetchData() {
          try{
              const { data } = await axios.get(`http://localhost:3001/pokemon/page/${pagenum}`);
              setPokemonPageData(data.results);
              setNext(data.next);
              setPrev(data.previous);
              setLoading(false);
              data.results.forEach(async (pokemon) => {
                  const str = pokemon.url;
                  const s = str.split('/');
                  const id = s[s.length - 2];
                  const { data } = await axios.get(`http://localhost:3001/pokemon/${id}`);
                  setIndividualPokemonData(current => [...current, data]);
              })

          } catch (e){
              setLoading(false);
              setExists(false);
              console.log(e);
          }
      }      

      fetchData();
     
  }, [pagenum]);

  const getImageUrl = (pokemonData, pokemonId) => {
      let result = null;
      pokemonData.forEach((pokemon) => {
         if((pokemon.id === pokemonId) && pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other['official-artwork'] && pokemon.sprites.other['official-artwork'].front_default){
            result = pokemon.sprites.other['official-artwork'].front_default;
         } 
      })
      if(result === null){
         return noImage;
      } else {
         return result;
      }
  }

  const getSelectedTrainerId = (trainers) =>{
      let result = null;
      trainers.forEach((trainer) => {
         if(trainer.selected){
            result = trainer.id;
         }
      })
      return result;
  }

  const determineButtonText = (pokemonId, trainers) =>{
      let result = "Catch";
      trainers.forEach((trainer) =>{
         if(trainer.selected && trainer.pokemon.length > 0){
            trainer.pokemon.forEach((elem) => {
               if(elem.id === pokemonId){
                  result = "Release";
               }
            })
         }
      })
      return result;
  }

  li = pokemonPageData && 
   pokemonPageData.map((pokemon) => {
            const str = pokemon.url;
            const s = str.split('/');
            const id = s[s.length - 2];

            buttonText = determineButtonText(id, allTrainers);
            
            imageUrl = getImageUrl(individualPokemonData, Number.parseInt(id));
            
            return (
               <div className='card' key={id}>
                     <div className= "card-body">
                        <Link to={`/pokemon/${id}`}>
                           <img alt={pokemon.name} src={imageUrl}/>
                           <br/>
                           <br/>
                             {pokemon.name}
                           <br/>
                           <br/>
                        </Link>
                        <br/>
                        <CatchReleaseButton 
                           name = {pokemon.name}
                           id = {id}
                           bText = {buttonText}
                           trainerId = {getSelectedTrainerId(allTrainers)}
                           url = {imageUrl}
                        />
                        <br/>
                     </div>
               </div>
               
           )
        })
   
   if (loading){
         return <div className="App"> 
                     <h2> Loading...</h2>
                 </div>
   } else if (!exists){
      return  <div className="App">
                  <h2> Error 404: Unable to Retrieve Pokemon Page</h2>
                  <br/>
                  <br/>
               </div>
   } else if (pokemonPageData){
      if(prev === null){
         return (
            <div className="App">
                <h2> Pokemon </h2>
                <br/>
                <Link className='link' to={`/pokemon/page/${nextPage}`}>Next</Link>
                <br/>
                <br/>
                {li}
                <br/>
                <br/>
                <Link className='link' to={`/pokemon/page/${nextPage}`}>Next</Link>
            </div>
        );                     
      } else if (next === null) {
         return (
            <div className="App">
                <h2> Pokemon </h2>
                <br/>
                <Link className='link' to={`/pokemon/page/${prevPage}`}>Prev</Link>
                <br/>
                <br/>
                {li}
                <br/>
                <br/>
                <Link className='link' to={`/pokemon/page/${prevPage}`}>Prev</Link>
            </div>
        );                              
      } else {
         return (
            <div className='App'> 
                <h2> Pokemon </h2>
                <br/>
                <Link to={`/pokemon/page/${prevPage}`}>Prev</Link>
                <br/>
                <Link to={`/pokemon/page/${nextPage}`}>Next</Link>
                <br/>
                <dl>
                {li}
                </dl>
                <br/>
                <Link to={`/pokemon/page/${prevPage}`}>Prev</Link>
                <br/>
                <Link to={`/pokemon/page/${nextPage}`}>Next</Link>
            </div>   
        )         
      }
   }

}

export default PokemonList;