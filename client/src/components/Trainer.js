/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import React from 'react';
import '../App.css';

import {useDispatch} from 'react-redux';
import actions from '../actions';
import {Link} from 'react-router-dom';

function Trainer(props) {
    const { isSelected, trainerData } = props
    let trainerId = trainerData.id;
    const dispatch = useDispatch();

    const deleteTrainer = () => {
        dispatch(actions.deleteTrainer(trainerId));
    }
  
    const selectTrainer = () => {
        dispatch(actions.selectTrainer(trainerId));
        document.getElementById(trainerData.id).text = 'Selected';
    }  

    const unselectTrainer = () => {
        dispatch(actions.unselectTrainer(trainerId));
        document.getElementById(trainerData.id).text = 'Select Trainer';
    }

    if(isSelected[0] === true){
        if(isSelected[1] === trainerData.id && trainerData.selected){
            return (
                <div className= 'trainer-cards'> 
                   <h3>{trainerData.name}</h3>
                   <button
                      className="button"
                      onClick = {unselectTrainer}
                      id = {trainerData.id}
                   >
                      Unselect Trainer
                   </button>
    
                   {trainerData.pokemon.length > 0 && trainerData.pokemon.map((pokemon) =>{
                        return (   
                            <Link to={`/pokemon/${pokemon.id}`}>
                                <div className= 'pokemon-card' key={pokemon.id}> 
                                    <img alt={pokemon.name} src={pokemon.img}/>
                                </div>
                            </Link>
                        );
                   })}
                </div>
             );
        } else {
            return (
                <div className= 'trainer-cards' key={trainerData.id}> 
                    <h3>{trainerData.name}</h3>
                    <button
                        className="button"
                        onClick = {deleteTrainer}
                    >
                        Delete Trainer
                    </button>
                    {trainerData.pokemon.length > 0 && trainerData.pokemon.map((pokemon) =>{
                        return (   
                            <Link to={`/pokemon/${pokemon.id}`}>
                                <div className= 'pokemon-card' key={pokemon.id}> 
                                    <img alt={pokemon.name} src={pokemon.img}/>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            );            
        }
    } else {
        if(trainerData.selected){
            return (
                <div className= 'trainer-cards' key={trainerData.id}> 
                   <h3>{trainerData.name}</h3>
                   <button
                      className="button"
                      onClick = {unselectTrainer}
                      id = {trainerData.id}
                   >
                      Unselect Trainer
                   </button>
    
                   {trainerData.pokemon.length > 0 && trainerData.pokemon.map((pokemon) =>{
                        return (   
                            <Link to={`/pokemon/${pokemon.id}`}>
                                <div className= 'pokemon-card' key={pokemon.id}> 
                                    <img alt={pokemon.name} src={pokemon.img}/>
                                </div>
                            </Link>
                        );
                   })}
                </div>
             );
        } else {
            return (
                <div className= 'trainer-cards' key={trainerData.id}> 
                    <h3>{trainerData.name}</h3>
                    <button
                        className="button"
                        onClick = {selectTrainer} 
                        id = {trainerData.id}
                    >
                        Select Trainer
                    </button>
                    <button
                        className="button"
                        onClick = {deleteTrainer}
                    >
                        Delete Trainer
                    </button>
                    {trainerData.pokemon.length > 0 && trainerData.pokemon.map((pokemon) =>{
                        return (   
                            <Link to={`/pokemon/${pokemon.id}`}>
                                <div className= 'pokemon-card' key={pokemon.id}> 
                                    <img alt={pokemon.name} src={pokemon.img}/>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            );
        }        
    }
}

export default Trainer;