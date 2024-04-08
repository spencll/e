import { useState } from "react";
import "./App.css";
import Deck from "./Deck";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Deck />
    </>
  );
}

export default App;
