import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom"
import { useState } from "react";
import './App.css'
import ColorDetails from "./ColorDetails";
import ColorForm from "./ColorForm";
import ColorList from "./ColorList";

// ### **User Stories**

// 1. As a user, I can go to */colors* to see a list of all available colors.

// 2. As a user, I can click on one of the colors in my colors list and get taken to a page where I can see that color in all its glory.
//     (The route here should be */colors/:color* )
    
// 3. As a user, I can click on a button to show a form that will let me add a new color.
//     Note that you can give an *input* a type of *color* if you’re trying to select a color. (The route here should be */colors/new*)
    
// 4. As a user, when I submit my new color form, I am redirected to the colors index, and my new color appears at the top.
// 5. As a user, if I try to navigate to a color page that does not exist (eg, */colors/nope*), I am redirected to the colors index page.
// 6. As a user, if I try to navigate to an invalid url (eg, */this-is-not-valid*), I am redirected to the colors index page.

// Here’s an idea of what your app could look like:


function App() {

  // creating new state of colors
  const [colors, setColors] = useState(["red","yellow","green"]);

  // Add color function to pass down to ColorForm
  const addColor = (newColor) => {
    setColors([newColor, ...colors ]);
  };
  
  //  Form display for add color
  const [isFormDisplayed, setIsFormDisplayed] = useState(true);
    const toggleFormDisplay = () => {
      setIsFormDisplayed(!isFormDisplayed);
    };

  return (
    <>  
    <h1>COLORS!</h1>
   
    <BrowserRouter>
    {isFormDisplayed && <Link to="/colors/new" onClick={toggleFormDisplay}><h2>Add color</h2></Link>}
    <Routes>
    <Route exact path="/colors" element={<ColorList colors={colors} toggleFormDisplay={toggleFormDisplay}/>} ></Route>
    <Route exact path="/colors/new" element={<ColorForm addColor={addColor} toggleFormDisplay={toggleFormDisplay}/>}></Route>
    <Route path="/colors/:color" element={<ColorDetails colors={colors} toggleFormDisplay={toggleFormDisplay}/>}></Route>
    <Route path="*" element={<Navigate to="/colors" />} />

 </Routes>
</BrowserRouter>
    </>
  )
}

export default App
