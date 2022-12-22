/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import React from 'react';
import '../App';

function Home() {
  return (
    <div className='card'>
      <div className='card-body'>
       
        <p className='cap-first-letter:first-letter'>
          Pokemon Trainer Application
        </p>
        <p>
          It uses Express Server with Redis acting as the database. 
          The front end utilizes the react framework and redux for state management.  
        </p>
      </div>
    </div>
  );
}

export default Home;
