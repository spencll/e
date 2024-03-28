// ## **Part 2**

// Define a *Tweet* component which takes as props the username of the user who wrote the tweet, the name of the user who wrote the tweet, the date of the tweet, and the message being tweeted.

// Create an *App* component that renders at least three tweets.

// Style your *Tweet* component using a CSS class.

const App = () => (
  <div>
    <Tweet        
    username= "user1"
    name= "name1"
    date= "3/28/24"
    message= "msg1"
    />
      <Tweet        
    username= "user2"
    name= "name2"
    date= "3/29/24"
    message= "msg2"
    />
       <Tweet        
    username= "user3"
    name= "name3"
    date= "3/30/24"
    message= "msg3"
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
