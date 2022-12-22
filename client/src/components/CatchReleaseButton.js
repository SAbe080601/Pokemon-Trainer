/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import React, {useState} from 'react';
import '../App.css';

import {useDispatch} from 'react-redux';
import actions from '../actions';


function CatchReleaseButton(props) {

    const {name, id, bText, url, trainerId} = props;
    
    const [buttonText, setButtonText] = useState(bText);
    
    const dispatch = useDispatch();


    function handleClick(){
        if(trainerId === null){
            alert("Trainer Not Selected");
            return (
                <button
                    className="button"
                    onClick={handleClick}
                >
                    {buttonText}
                </button>
            );            
        } else if(buttonText === "Catch"){
            setButtonText("Release");
            let pokemonData = {
                name: name,
                id: id,
                img: url 
            }


            dispatch(actions.catchPokemon(trainerId, pokemonData));
            return (
                <button
                    className="button"
                    onClick={handleClick}
                >
                    {buttonText}
                </button>
            );
        } else {
            setButtonText("Catch");
            
            let pokemonData = {
                name: name,
                id: id,
                img: url
            }
            dispatch(actions.releasePokemon(trainerId, pokemonData));
            return (
                <button
                    className="button"
                    onClick={handleClick}
                >
                    {buttonText}
                </button>
            );
        }
    }

    return (
        <button
            className="button"
            onClick={handleClick}
        >
            {buttonText}
        </button>
    );  
}

export default CatchReleaseButton;