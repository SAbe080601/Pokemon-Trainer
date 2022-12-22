/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

import {useState} from 'react';
import {useDispatch} from 'react-redux';
import actions from '../actions'

function AddTrainer() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    let body = null;
   
    const addTrainer = () => {
        dispatch(actions.createTrainer(input));
        document.getElementById('name').value = '';
    }

    body = (
        <form>
            <div className= 'form-group'>
                <label>
                    Name:
                    <br />
                    <input
                        type= "text"
                        id = 'name'
                        placeholder = "Name"
                        required
                        autoFocus={true}
                        onChange = {(event) => {
                            setInput(event.target.value);
                        }}
                    />
                </label>
            </div>
            <br /> 
            <button 
                className='button' 
                onClick = {addTrainer} 
            >
                Create Trainer
            </button>                    
        </form>
    );

    return (
       <div className="App">
          {body}
       </div>
    );
 }
 
 export default AddTrainer;