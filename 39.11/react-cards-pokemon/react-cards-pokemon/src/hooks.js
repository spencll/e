import { useState } from "react";
import {v4 as uuid} from 'uuid'
import axios from 'axios'

const useToggleState = (initialState = true) => {
    // Setting state
    const [state, setState] = useState(initialState);


    // Redefining the setState function
    const toggleState = () => {
      setState(state => !state)
    }
    // Format of the useState, useState function is now toggleState
    // can still redefine the array in the actual useToggleState call

    return [state, toggleState]
  }

const useAxios = (URL) => {
    // Setting state 
    const [state, setState] = useState([]);
    //Redefining setState function 
  const addCard = async (restOfURL="") => {
    const response = await axios.get(
      `${URL}${restOfURL}`
    );
    setState(cards => [...cards, { ...response.data, id: uuid() }]);
  };
  return [state, addCard]
}




  export {useToggleState, useAxios}
  