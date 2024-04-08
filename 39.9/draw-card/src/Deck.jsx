import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

// ## **Part 1: Click to Draw**

// Build an app that displays a deck of cards, one card at a time. When the page loads, go to the [Deck of Cards API](http://deckofcardsapi.com/) to create a new deck, and show a button on the page that will let you draw a card.

// Every time you click the button, display a new card, until there are no cards left in the deck. If you try to draw when there are no cards remaining, an alert message should appear on the screen with the text “Error: no cards remaining!”.

// ## **Part 2: Shuffle The Deck**

// Add a button that when clicked, will shuffle the deck, so that you can start drawing from a full deck without refreshing the page. You’ll have to make a call to the cards api to shuffle the existing deck. The button should not be clickable while the shuffle is in progress. The shuffle should remove all of the cards on screen

//
// deck ID is the reference
function Deck() {
  let BASE_URL = "https://deckofcardsapi.com/api/deck";

  const deckId = useRef();
  let [cards, setCards] = useState([]);

  //is it shuffling? then it's loading
  const [loading, setLoading] = useState(false);

  //card counter state
  const [remainingCards, setRemainingCards] = useState(52);

  //runs only once in beginning, id is stored as ref since it's not changing
  useEffect(function makeNewDeck() {
    async function newDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new/shuffle`);
      deckId.current = deckResult.data.deck_id;
      setRemainingCards(deckResult.data.remaining);
    }
    newDeck();
  }, []);

  //draw card from deck and add to active cards. Alert when no more cards
  async function drawCard() {
    const cardResult = await axios.get(`${BASE_URL}/${deckId.current}/draw`);
    if (cardResult.data.remaining === 0) {
      setRemainingCards(cardResult.data.remaining);
      alert("Error: no cards remaining!");
      return;
    } else {
      const newCard = `${cardResult.data.cards[0].value} of ${cardResult.data.cards[0].suit}`;
      setCards((prevCards) => [...prevCards, newCard]);
      setRemainingCards(cardResult.data.remaining);
    }
  }

  // reshuffle same deck and removes displayed card
  async function shuffleDeck() {
    setLoading(true);
    await axios.get(`${BASE_URL}/${deckId.current}/shuffle`);
    setCards([]);
    setLoading(false);
    setRemainingCards(52);
  }

  return (
    <div>
      <ul>
        {loading ? (
          <i>loading...</i>
        ) : (
          cards.map((card, index) => <li key={index}>{card}</li>)
        )}
      </ul>
      {remainingCards === 0 ? null : <button onClick={drawCard}>Draw</button>}
      <button onClick={shuffleDeck}>Shuffle</button>
    </div>
  );
}

export default Deck;
