import React, { useState } from "react";

const answers = [
  { msg: "It is certain.", color: "green" },
  { msg: "It is decidedly so.", color: "green" },
  { msg: "Without a doubt.", color: "green" },
  { msg: "Yes - definitely.", color: "green" },
  { msg: "You may rely on it.", color: "green" },
  { msg: "As I see it, yes.", color: "green" },
  { msg: "Most likely.", color: "green" },
  { msg: "Outlook good.", color: "green" },
  { msg: "Yes.", color: "green" },
  { msg: "Signs point to yes.", color: "goldenrod" },
  { msg: "Reply hazy, try again.", color: "goldenrod" },
  { msg: "Ask again later.", color: "goldenrod" },
  { msg: "Better not tell you now.", color: "goldenrod" },
  { msg: "Cannot predict now.", color: "goldenrod" },
  { msg: "Concentrate and ask again.", color: "goldenrod" },
  { msg: "Don't count on it.", color: "red" },
  { msg: "My reply is no.", color: "red" },
  { msg: "My sources say no.", color: "red" },
  { msg: "Outlook not so good.", color: "red" },
  { msg: "Very doubtful.", color: "red" },
];

// On click, pick random thing from array.
// Change state to answer

function Eightball() {
  const [answer, setAnswer] = useState(`Think of a question`);
  const [color, setColor] = useState(`Black`);

  function randomize(max) {
    return Math.floor(Math.random() * max);
  }

  function handleClick() {
    let randAnswer = answers[randomize(answers.length)];
    setAnswer(`${randAnswer.msg}`);
    setColor(`${randAnswer.color}`);
  }

  return <button className="Eightball" 
  style={{backgroundColor:`${color}`}} 
  onClick={handleClick}>{answer}</button>;
}

export default Eightball;
