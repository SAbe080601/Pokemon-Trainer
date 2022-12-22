/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/


import React, {useState, useEffect, useRef} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import noImage from '../img/download.jpeg';
import '../App.css';
import CatchReleaseButton from './CatchReleaseButton';
import {useSelector} from 'react-redux';

function Pokemon() {
   const [pokemonData, setPokemonData] = useState(undefined);
   const [loading, setLoading] = useState(true);
   const [exists, setExists] = useState (true);
   const dataFetchRef = useRef(false);
   const {id} = useParams();

   let img = null;
   let name = null;
   let types = null;

   const allTrainers = useSelector((state) => state.trainers);

   useEffect(() => {
      if(dataFetchRef.current){
         return;
      } else {
         console.log('render individual pokemon');
         async function fetchData() {
            try{
               const { data } = await axios.get(`http://localhost:3001/pokemon/${id}`);
               setPokemonData(data);
               setLoading(false);
            } catch (e){
               setExists(false);
               setLoading(false);
               
               console.log(e);
            }
         }
         dataFetchRef.current = true;
         fetchData();
      }
   }, [id]);
  
   if(pokemonData && pokemonData.name){
      name = pokemonData.name;
   } else {
      name = 'Unknown';
   }

   if(pokemonData && pokemonData.sprites && pokemonData.sprites.other &&pokemonData.sprites.other['official-artwork'] && pokemonData.sprites.other['official-artwork'].front_default){
      img = <img alt={name} src={pokemonData.sprites.other['official-artwork'].front_default}/>;
   } else {
      img = <img alt={name} src={noImage}/>;
   }

   if(pokemonData && pokemonData.types && pokemonData.types.length > 0){
      types = pokemonData.types.map((type) => {
         return (
            <div>
               {type.type.name}
            </div>
         );
      })
   } else {
      types = "Unknown";
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

   const getSelectedTrainerId = (trainers) =>{
      let result = null;
      trainers.forEach((trainer) => {
         if(trainer.selected){
            result = trainer.id;
         }
      })
      return result;
  }

   if(loading){
      return <div className="App"> 
               <h2> Loading...</h2>
            </div>      
   } else if(!exists){
      return  <div className="App">
                  <h2> Error 404: Pokemon Not Found</h2>
                  <br/>
               </div>      
   }  else {
      return (
         <div className="App">
             <br />
             <h2> {name} </h2>
             <br />
             <br />
             {img}
             <br />
             <br />
             
            Types:
            <br />
            <br />
            {types}
            <br />
            <br />
            <CatchReleaseButton 
               name = {pokemonData.name}
               id = {pokemonData.id.toString()}
               bText = {determineButtonText(pokemonData.id.toString(), allTrainers)}
               url = {pokemonData.sprites.other['official-artwork'].front_default}
               trainerId = {getSelectedTrainerId(allTrainers)}
            />
         </div>  
      )    
   }
}

export default Pokemon;