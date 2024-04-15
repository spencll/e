import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
import { useState, useEffect } from "react";

/** List of jokes. */

// Simple API response function
function getJokes(numJokesToGet) {
  return axios.get("https://icanhazdadjoke.com", {
    headers: { Accept: "application/json" }
  });
}

// Default 5 jokes
function JokeList({numJokesToGet=5}) {

// states: jokes, isLoading
const [jokes,setJokes]=useState([])
const [isLoading,setIsLoading]=useState(true)

// First render, generate jokes via function. Rerender if jokes or numJokesToGet changes 
useEffect(() => {
  //original getJokes function
const generateNewJokes = async () => {
  // Loading screen
  setIsLoading(true);
  try {
    let newJokes = [];
    let seenJokes = new Set();

    // While loop to add to set until number of unique jokes reached.
    while (newJokes.length < numJokesToGet) {
      let res = await getJokes();
      let { ...joke } = res.data;
      
      // Each joke now has property of votes
      if (!seenJokes.has(joke.id)) {
        seenJokes.add(joke.id);
        newJokes.push({ ...joke, votes: 0 });
      } else {
        console.log("Duplicate joke found!");
      }
    }
    setJokes(newJokes);
    // Loading done
    setIsLoading(false);
  } catch (err) {
    console.error(err);
      // Loading done
    setIsLoading(false);
  }
};
// Run if there's no jokes (at first render and onClick reset)
if (jokes.length===0) generateNewJokes()

}, [jokes, numJokesToGet]);

// Vote tracker for each specific joke 
const vote = (id, delta) => {
  setJokes(jokes => (
    jokes.map(j =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    )
  ));
};

  /* empty out joke list which triggers useEffect to generate jokes */
  function newJokes() {
    setJokes([]);
    setIsLoading(true);
  }

// Loading screen if render in process
if (isLoading) {
  return (
    <div className="loading">
      <i className="fas fa-4x fa-spinner fa-spin" />
    </div>
  );
}

// Sort the jokes from highest to lowest votes
let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

// props to pass down to Joke: id, vote, votes, text
return (
  <div className="JokeList">
    <button
      className="JokeList-getmore"
      onClick={newJokes}
    >
      Get New Jokes
    </button>

    {sortedJokes.map(j => (
      <Joke
        text={j.joke}
        key={j.id}
        id={j.id}
        votes={j.votes}
        vote={vote}
      />
    ))}
  </div>
);

}


export default JokeList;

