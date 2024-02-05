// Let’s have some fun working with callbacks and promises! You’ll complete these exercises twice, using two different methods. First, you’ll use promises! Then, in the exercises at the end of the next subunit, you’ll use ***async*** / ***await***!

// If this is your first time seeing these challenges, start by solving them with promises.

// Once you’ve solved this using promises continue to the next subunit and after learning about async functions solve these using async and await.

// ## **Part 1: Number Facts**

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).

let url = "http://numbersapi.com";
let num = 42;
async function getFact() {
  let res = await axios.get(`${url}/${num}`);
  console.log(res);
}
getFact();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// $.getJSON(`${url}${nums}?json`).then((res) => {
//     console.log(res);
//   });
let nums = [1, 2, 3, 4];
async function getFacts() {
  let res = await axios.get(`${url}/${nums}`);
  console.log(res);
}
getFacts();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

//     *(Note: You’ll need to make multiple requests for this.)*

// let arr = [];
// nums.forEach((num) => arr.push($.getJSON(`${url}${num}?json`)));

// Promise.all(arr).then((res) => {
//   res.forEach((fact) => $("body").append(`<p>${fact.text}</p>`));
// });

async function get4Facts() {
  let facts = await Promise.all([
    axios.get(`${url}/${num}`),
    axios.get(`${url}/${num}`),
    axios.get(`${url}/${num}`),
    axios.get(`${url}/${num}`),
  ]);
  facts.forEach((fact) => $("body").append(`<p>${fact.data}</p>`));
}
get4Facts();

// 1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let url2 = "https://deckofcardsapi.com/api/deck/";

async function drawCard() {
  let res = await axios.get(url2 + "new/draw");
  console.log(res.data.cards[0].value);
  console.log(res.data.cards[0].suit);
}
drawCard();
// $.getJSON(url2 + "new/draw").then((res) => {
//   console.log(res.cards[0].value);
//   console.log(res.cards[0].suit);
// });

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.

//     Once you have both cards, ***console.log*** the values and suits of both cards.
async function drawCards() {
  let card1 = await axios.get(url2 + "new/draw");
  console.log(card1.data.cards[0].value);
  console.log(card1.data.cards[0].suit);
  let id = card1.data.deck_id;
  let card2 = await axios.get(url2 + `/${id}` + "/draw");
  console.log(card2.data.cards[0].value);
  console.log(card2.data.cards[0].suit);
}
drawCards();

// $.getJSON(url2 + "new/draw")
//   .then((res) => {
//     id = res.deck_id;
//     console.log(res.cards[0].value);
//     console.log(res.cards[0].suit);
//     return $.getJSON(url2 + `/${id}` + "/draw");
//   })
//   .then((res) => {
//     console.log(res.cards[0].value);
//     console.log(res.cards[0].suit);
//   });

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

async function part3() {
  let res = await axios.get(url2 + "new/draw");
  let id2 = res.data.deck_id;
  console.log(res.data.cards[0].value);
  console.log(res.data.cards[0].suit);
  $("body").append(`<p>${res.data.cards[0].value}</p>`);
  $("body").append(`<p>${res.data.cards[0].suit}</p>`);

  $(function () {
    $("button").on("click", async function () {
      let drawing = await axios.get(url2 + `/${id2}` + "/draw")

        console.log(drawing.data.cards[0].value);
        console.log(drawing.data.cards[0].suit);

        $("body").append(`<p>${drawing.data.cards[0].value}</p>`);
        $("body").append(`<p>${drawing.data.cards[0].suit}</p>`);

  
    });
})}

part3();
