/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import React, {useState} from 'react';
import Trainer from './Trainer';
import {useSelector} from 'react-redux';
import '../App.css';
import AddTrainer from './AddTrainer';

function Trainers() {

   const [addBtnToggle, setBtnToggle] = useState(false);

   const allTrainers = useSelector((state) => state.trainers);

   console.log("allTrainers", allTrainers);


   const alreadySelected = (trainers) => {
      let flag = false;
      let trainerId = undefined;
      trainers.forEach((trainer) => {
         if(trainer.selected === true){
            flag = true;
            trainerId = trainer.id;
         }
      })
      return [flag, trainerId];
   }

   if(allTrainers.length === 0){
      return (
         <div className="App">
            <h2> Trainers </h2>
            <button
               onClick = {() =>{
                  setBtnToggle(!addBtnToggle);
               }}
            > 
               Add Trainer 
            </button>
            {addBtnToggle && <AddTrainer />}
            <br/>
            <br/>
            <h3>No Trainers Currently Created</h3>
         </div>
      );     
   } else {
      return (
         <div className="App">
            <h2> Trainers </h2>
            <button
               onClick = {() =>{
                  setBtnToggle(!addBtnToggle);
               }}
            > 
               Add Trainer 
            </button>
            
            {addBtnToggle && <AddTrainer />}
            <br/>
            <br/>
   
            
            {allTrainers.map((trainer) => {
               console.log(trainer);
               return (
                  <div key={trainer.id}>
                     <br/>
                     <Trainer isSelected= {alreadySelected(allTrainers)} trainerData = {trainer} />
                     <br/>
                  </div>
               );
            })}
            
         </div>
      );     
   }
}

export default Trainers;