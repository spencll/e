import './App.css';
import DogList from './DogList';
import DogDetails from './DogDetails';
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import axios from 'axios';

// Outline
// App-> DogList -> DogDetails
// 1. Set up routes and links to the components (elements)
// 2. Set up elements 



// ## **Part 1: React Router Dog Finder**
// Build an app that routes to different dogs and displays information on that dog when you’re at that route.

// The routes should look like this:
// - */dogs* is the homepage and shows all three dogs
// - Clicking on a dog from the homepage takes you to that dog’s route. For example, clicking on Whiskey will take you to */dogs/whiskey*.
// - every other endpoint not listed should redirect you to */dogs.*


// ### **Recommended Structure**
// You can preload the *<App />* component with the following *defaultProps* for convenience:


// The *<App />* should render:
// - a *<Nav />* component with the dogs’ names passed as props
// - a *<Switch>* with your *<Route />* declarations


// Here is an Example Snippet from the `render` method of *<App />* To Get You Started:

// ```jsx
// return (
//   <Switch>
//     <Route exact path="/dogs" >
//       <DogList /> // what props will this need?
//     </Route>
//     <Route path="/dogs/:name" >
//       <DogDetails /> // what props will this need?
//     </Route>
//     <Redirect to="/dogs" />
//   </Switch>
// );
// ```

// In this example:

// - *<DogList />* takes all the dog info from the props of *<App />*
// - *<DogDetails />* shows all of the info about a single dog
// - In *<DogDetails />*, how will you derive the current dog, e.g. *whiskey*?
// - Bonus: is there a way to get the current dog *before* you render the component, passing *dog* instead of the entire list of dog data?



function App() {

  // creating new state of dogs
    const [dogs, setDogs] = useState({
      data: null,
      isLoading: true
    });

// Fetching dogs from db.json upon first render 
useEffect(() => {
  async function loadDogs(){
    const response = await axios.get("http://localhost:5001/dogs")
    setDogs({
      data: response.data,
      isLoading: false
    })
  }
  loadDogs()
}, [])

// dogs is object with array of dogs in data and true/false in isLoading

  return (
    <>
    <BrowserRouter>
    <Routes>
        {/* what props will DogList? dogs */}
    <Route exact path="/dogs" element={<DogList dogs={dogs.data}/>} ></Route>
        {/* what props will DogDetails need? dogs, can pull name,age,src,facts */}
    <Route path="/dogs/:name" element={<DogDetails dogs={dogs.data}/>}></Route>
    {/* No matching route, default here */}
    <Route path="*" element={<Navigate to="/dogs" />} />

 </Routes>
</BrowserRouter>
    </>
  );


}


export default App;
